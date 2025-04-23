import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import amlClient, { AML_SOURCES, DEFAULT_AML_MIN_SCORE, ENTITY_TYPES } from "./ofacapi_client.js";

// Create an MCP server
const server = new McpServer({
  name: "sanctions",
  version: "1.0.0"
});

// Define the case schema based on the API requirements
const caseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  citizenship: z.string().optional(),
  nationality: z.string().optional(),
  address: z.object({
    id: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    stateOrProvince: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    fullAddress: z.string().optional(),
  }).optional(),
  phoneNumber: z.string().optional(),
  emailAddress: z.string().optional(),
  cryptoId: z.string().optional(),
  identification: z.array(
    z.object({
      id: z.string().optional(),
      type: z.string().optional(),
      idNumber: z.string().optional(),
      country: z.string().optional(),
      issueDate: z.string().optional(),
      expirationDate: z.string().optional(),
    })
  ).optional(),
});

// Add the scan tool with proper parameters and response handling
server.tool(
  "scan",
  {
    cases: z.array(caseSchema),
    type: z.enum(ENTITY_TYPES),
    minScore: z.number().default(DEFAULT_AML_MIN_SCORE).optional(),
    sources: z.array(z.enum(AML_SOURCES)).default(AML_SOURCES).optional()
  },
  async ({ cases, type, minScore = DEFAULT_AML_MIN_SCORE, sources = AML_SOURCES }) => {
    try {
      // Call the AML API with the provided parameters
      const result = await amlClient.screenOrgs(cases, [type], sources, minScore);
      
      if (result.error) {
        return {
            content: [{ type: "text", text: `Error performing scan: ${result.error.message}` }]
        };
      } 
      
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error performing scan: ${error.message}` }]
      };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
