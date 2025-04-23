# Sanctions MCP Server

A powerful sanctions screening API MCP Server, leveraging [OFAC API](https://www.ofac-api.com/) to provide comprehensive risk assessments for individuals and organizations.

🎉 Ready for integration with Claude through the Model Context Protocol 🎉



https://github.com/user-attachments/assets/41ea6318-5b17-4da1-8d6d-8cb60b5342ea



## Key Features
- **Sanctions Screening**: Screen individuals and organizations against major global sanctions lists including OFAC SDN, UN, OFSI, and more
- **Customizable Risk Threshold**: Set minimum risk scores to determine match relevance
- **Comprehensive Entity Support**: Screen both individuals and organizations with detailed information
- **Multiple Identification Methods**: Support for various identifiers including names, addresses, identification documents, and more
- **Source Selection**: Choose which sanctions lists to check against based on your compliance needs

## How to Use

You can run the Sanctions MCP Server using Node.js directly.

### Requirements
1. Node.js v20 or higher
2. npm or yarn for dependency management
3. git

### Installation

#### 1. Clone the repository
```sh
git clone https://github.com/yourusername/mcp-ofac
cd mcp-ofac
```

#### 2. Install dependencies
```sh
npm install
```

#### 3. Configure `claude_desktop_config.json`

Add the following configuration to your `claude_desktop_config.json` file. Make sure to:
- Update the paths to match your local Node.js installation and repository location
- Add your OFAC API key if required

```json
{
  "mcpServers": {
    "sanctions": {
      "command": "/path/to/your/node",
      "args": ["/path/to/your/mcp-ofac/index.js"],
      "env": {
        "OFAC_API_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Usage Examples

### Screening an Individual

You can ask Claude to screen individuals against sanctions lists:

"Can you check if John Smith born on 1980-01-15 from Syria is on any sanctions lists?"

### Screening an Organization

You can ask Claude to check organizations:

"Is there a sanctioned entity called Tech Solutions Ltd based in Tehran, Iran?"

### Custom Screening Parameters

You can specify custom parameters for more targeted screening:

"Check if Maria Rodriguez with passport number AB123456 from Venezuela is on the OFAC SDN list with a minimum match score of 90."

## How the Tool Works

The Sanctions MCP Server processes screening requests with the following parameters:

- **cases**: Array of entities to screen (individuals or organizations) with identifying information
- **type**: Entity type ("person" or "organization")
- **minScore**: Minimum score threshold for matches (0-100, default: 95)
- **sources**: Which sanctions lists to check against (SDN, NONSDN, DPL, UN, OFSI, etc.)

The tool returns detailed match information, including sanctioned entity details, match scores, and source information.

## Data Format

### Input Schema
The server accepts detailed entity information including:
- Name
- Date of birth (for individuals)
- Gender (for individuals)
- Citizenship/Nationality
- Address details
- Contact information
- Identification documents

### Response Format
The server returns a JSON response with:
- Match details
- Match scores
- Source information
- Entity profiles

## Restart Claude Desktop

After configuring your `claude_desktop_config.json`, restart Claude Desktop to apply the changes and enable the sanctions screening capability.
