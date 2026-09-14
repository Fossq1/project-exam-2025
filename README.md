Sportsworld

A full-stack sports management application built as a group exam project at Kristiania University College, December 2025.

The application lets a user manage athletes, venues and the club's finances. Athletes and venues are stored in a SQLite database and served through a REST API, while the frontend presents the data and tracks the remaining budget as athletes are purchased.

Tech stack

Backend — ASP.NET Core 9 (C#), Entity Framework Core, SQLite Frontend — React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7, Axios

Architecture

The project is split into two independent applications:

SportsworldAPI/        REST API
  Controllers/         One controller per resource (Athlete, Venue, Finance)
  Models/              Entity classes mapped to database tables
  Interfaces/          Contracts for the models
  Contexts/            Entity Framework DbContext
  Migrations/          EF Core schema migrations

Sportsworld/src/       React frontend
  pages/               One component per route
  components/          Reusable UI, grouped by domain
  contexts/            React Context providers for shared state
  services/            Axios clients, one per API resource
  interfaces/          TypeScript interfaces shared across the app
  routing/             Route definitions

Each resource follows the same path through the stack: a controller exposes CRUD endpoints, a service in the frontend calls them over HTTP, a context holds the resulting state, and components read from that context.

Running the project

The API and the frontend run as two separate processes.

API (defaults to http://localhost:5177):

bash
cd SportsworldAPI
dotnet restore
dotnet ef database update
dotnet run

Frontend (defaults to http://localhost:5173):

bash
cd Sportsworld
npm install
npm run dev

The API allows requests from any origin in development, so no proxy configuration is needed.

Contributors and division of work

Built by Marius Foss Volden, Carol Shoaei and Eivind Trinh.

Work was divided by feature rather than by layer, so each contributor owned one resource across both the backend and the frontend.

Eivind Trinh — finance module

FinanceController.cs — CRUD endpoints against the SQLite database via Entity Framework, with separate handling for database and server exceptions
FinanceService.ts — Axios client returning a typed response wrapper
FinanceContext.tsx — React Context holding finance state globally, with immutable updates for purchases and deposits
FinancialStatusList / FinancialStatusItem — budget overview table
Route and provider wiring in AppRouting.tsx and main.tsx

[Legg inn tilsvarende for de to andre, eller be dem skrive sine egne avsnitt.]

Known limitations

Delivered under an exam deadline. The following are known trade-offs rather than oversights:

Finance state is client-side only. applyPurchase and addToMoneyLeft update React state but never call the API, so budget changes are lost on reload. The PUT endpoint exists and works — what is missing is the service call and the decision about when to persist. Writing on every click is simple but chatty; batching is efficient but needs conflict handling. The feature was prioritised as a working UI first, and the persistence layer did not make the deadline.

BankLoan.tsx is a placeholder. Taking a loan would have meant modelling debt and repayment as their own entity rather than mutating moneyLeft, which was more scope than the remaining time allowed. The stub is left in to show the intended structure.

DELETE on FinanceController takes the id as a query parameter. The route template is [HttpDelete] where the other endpoints use [HttpDelete("{id}")]. The endpoint works, but it breaks the REST convention the rest of the API follows, which makes the surface inconsistent for anyone consuming it.

The SQLite database file is committed. Binary files do not merge, so two people changing data at once produce a conflict that Git cannot resolve. The database should be generated from the existing EF Core migrations and the .db files ignored. It was committed early to give everyone identical seed data, and never taken back out.

Errors are caught and swallowed. Controllers return generic 500-level responses, and frontend services return success: false without a reason. That keeps the app from crashing, but it gives the user no information and makes debugging harder than it needs to be.
