import { SQL } from "bun";
import type { Token } from "./api/token";

export const db = new SQL({
  username: "postgres"
});

export const createTables = async (database: SQL): Promise<void> => {
  return await database.begin(sql => sql`
    CREATE TABLE IF NOT EXISTS tokens (
      access_token text NOT NULL,
      service text NOT NULL,
      expires bigserial NOT NULL
    )
  `);
};

export const removeExpiredTokens = async (database: SQL): Promise<number> => {
  const now = new Date();
  const deleted_tokens: Token[] = await database.begin(sql => sql`
    DELETE FROM tokens
    WHERE expires <= ${Number(now)}
    RETURNING *
  `);
  if (deleted_tokens.length) {
    console.log("Removed", deleted_tokens.length, "token(s) that had expired!");
  }

  return deleted_tokens.length;
};

export const addToken = async (database: SQL, token: {access_token: string, service: string, expires?: Date}): Promise<Token> => {
  if (!token.expires) {
    // Assume it expires in one day
    token.expires = new Date();
    token.expires.setHours(token.expires.getHours() + 24);
  }

  const returned: Token[] = await database.begin(sql => sql`
    INSERT INTO tokens (access_token, service, expires)
    VALUES (${token.access_token}, ${token.service}, ${Number(token.expires)})
    RETURNING *
  `);

  console.log("Added new token for", token.service);
  return returned[0];
};

export const getToken = async (database: SQL, service: string): Promise<Token> => {
  const now = new Date();
  const tokens: Token[] = await database.begin(sql => sql`
    SELECT * FROM tokens
    WHERE service = ${service}
    AND expires > ${Number(now)}
  `);
  return tokens[Math.floor(Math.random() * tokens.length)];
};
