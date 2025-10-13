/**
 * Updated Notion API integration using 2025-09-03 version
 * Key changes:
 * - Uses data source IDs for queries instead of database IDs
 * - Updates Notion-Version header to 2025-09-03
 * - Follows new /v1/data_sources endpoint pattern
 */

interface NotionPage {
  id: string;
  properties: Record<string, any>;
  [key: string]: any;
}

interface ProgramData {
  [key: string]: any;
}

/**
 * Query a Notion data source using the new 2025-09-03 API
 * @param apiKey - Notion API key
 * @param databaseId - Database ID (used to get data source if needed)
 * @param dataSourceId - Data source ID (the new way to query)
 * @param filter - Optional Notion filter object
 * @param sorts - Optional sort configuration
 */
export async function queryDataSource(
  apiKey: string,
  databaseId: string,
  dataSourceId: string,
  filter?: any,
  sorts?: any,
): Promise<NotionPage[]> {
  try {
    const body: any = {};

    if (filter) {
      body.filter = filter;
    }

    if (sorts) {
      body.sorts = sorts;
    }

    // Use the new /v1/data_sources endpoint with POST for querying
    const response = await fetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Notion-Version": "2025-09-03",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Notion API error:", error);
      throw new Error(`Failed to query data source: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error querying data source:", error);
    throw error;
  }
}

/**
 * Get data source information
 * @param apiKey - Notion API key
 * @param dataSourceId - Data source ID
 */
export async function getDataSourceInfo(apiKey: string, dataSourceId: string) {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2025-09-03",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data source info: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data source info:", error);
    throw error;
  }
}

/**
 * Get database with its data sources
 * @param apiKey - Notion API key
 * @param databaseId - Database ID
 */
export async function getDatabaseWithDataSources(
  apiKey: string,
  databaseId: string,
) {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2025-09-03",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch database: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching database:", error);
    throw error;
  }
}

/**
 * Main function to get program data - updated for new API
 * @param apiKey - Notion API key
 * @param databaseId - Database ID
 * @param dataSourceId - Data source ID
 */
export async function getProgramData(
  apiKey: string,
  databaseId: string,
  dataSourceId: string,
): Promise<ProgramData[]> {
  if (!apiKey) {
    throw new Error("Notion API key is required");
  }

  if (!databaseId) {
    throw new Error("Database ID is required");
  }

  if (!dataSourceId) {
    throw new Error("Data source ID is required");
  }

  try {
    // Query the data source with any necessary filters or sorts
    const pages = await queryDataSource(apiKey, databaseId, dataSourceId);

    // Transform the pages into your program data format
    const programData: ProgramData[] = pages.map((page) => ({
      id: page.id,
      properties: page.properties,
      // Add any additional transformations as needed
    }));

    return programData;
  } catch (error) {
    console.error("Error getting program data:", error);
    throw error;
  }
}
