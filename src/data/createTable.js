

const createTablesQuery = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS public.users (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      username character varying(40) NOT NULL,
      password character varying(200) NOT NULL,
      email character varying(50) NOT NULL,
      CONSTRAINT users_pkey1 PRIMARY KEY (id),
      CONSTRAINT email_unique_constraint UNIQUE (email)
  );
  CREATE INDEX IF NOT EXISTS email_idx ON public.users USING btree (email);

  CREATE TABLE IF NOT EXISTS public.plans (
      id bigint GENERATED ALWAYS AS IDENTITY,
      user_id uuid NOT NULL,
      plan_json jsonb NOT NULL,
      version integer NOT NULL DEFAULT 1,
      created_at timestamp without time zone DEFAULT now(),
      CONSTRAINT plans_pkey PRIMARY KEY (id),
      CONSTRAINT plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS user_id_plans_idx ON public.plans USING btree (user_id);

  CREATE TABLE IF NOT EXISTS public.profiles (
      id bigint GENERATED ALWAYS AS IDENTITY,
      user_id uuid NOT NULL,
      goal character varying(20) NOT NULL,
      experience character varying(30) NOT NULL,
      daysperweek integer NOT NULL,
      sessionlength integer NOT NULL,
      equipment character varying(50) NOT NULL,
      preferredsplit character varying(20) NOT NULL,
      injuries text,
      CONSTRAINT profiles_pkey PRIMARY KEY (id),
      CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS user_id_idx ON public.profiles USING btree (user_id);
`;

async function initDatabase(pool) {
    try {
        await pool.query(createTablesQuery);
        console.log("Database tables initialized successfully!");
    } catch (error) {
        console.error("Error initializing database tables:", error);
    }
}



export default initDatabase;