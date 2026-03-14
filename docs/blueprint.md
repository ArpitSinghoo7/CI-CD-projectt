# **App Name**: SysCheck Flow

## Core Features:

- Status API Endpoint: Provide a '/api/status' endpoint that returns basic JSON data about the application's health (e.g., running, degraded, error) and current version.
- Status Dashboard UI: A minimalist web-based dashboard displaying the current system status and version information fetched from the Status API, suitable for at-a-glance monitoring.
- Environment Variable Visualization: Visually indicate the application's runtime environment (e.g., 'development', 'staging', 'production') on the dashboard, demonstrating configuration changes through CI/CD.
- AI-Powered Troubleshooting Assistant: An AI tool integrated into the dashboard UI that provides simple, contextual troubleshooting tips or diagnostic prompts based on the reported application status.
- Build Information Display: Dynamically display critical build information (e.g., Git commit hash, build timestamp) on the dashboard to verify the successful integration and deployment of specific code changes.

## Style Guidelines:

- Primary color: A vibrant yet professional blue (#2E80FF) to convey efficiency and technological precision, designed to stand out against a dark interface.
- Background color: A very dark, subtly blue-tinged grey (#15181C), evoking a command-line or terminal interface, ideal for focus in technical environments.
- Accent color: A bright, clear aqua (#A4F9FF) for highlighting status changes, interactive elements, and critical information, providing strong contrast and visual interest.
- Headline and body font: 'Inter', a modern sans-serif typeface, chosen for its excellent readability and neutral, objective aesthetic, aligning with the technical nature of the app.
- Code and log display font: 'Source Code Pro', a monospaced sans-serif, specifically for presenting technical output, ensuring clarity and authenticity for system messages and code.
- Use minimalist, crisp line-based icons for status indicators, health checks, and navigation, ensuring immediate recognition and clean visual integration with the dark theme.
- A clean, structured dashboard layout, emphasizing clear data presentation and status updates, resembling a modern monitoring panel or command interface.
- Subtle, functional animations for status changes, loading indicators, and tooltip disclosures to provide immediate feedback without distraction, enhancing the user experience.