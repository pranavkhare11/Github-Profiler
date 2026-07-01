```text
src/
├── api/
│   └── github.js          # Centralized API layer (Single point of contact for external data)
├── components/            # Global, reusable UI elements (Buttons, Inputs, Layout containers)
│   ├── Button.jsx
│   ├── Input.jsx
│   └── Navbar.jsx
├── features/              # Modular business logic split by application domains
│   ├── search/
│   │   ├── SearchBar.jsx
│   │   └── SearchHistory.jsx   *Future expansion*
│   └── profile/
│       ├── ProfileCard.jsx
│       ├── ProfileTabs.jsx
│       └── RepoList.jsx        *Future expansion*
├── pages/                 # Structural page components tied directly to router endpoints
│   ├── Home.jsx
│   ├── ProfileLayout.jsx
│   └── PageNotFound.jsx
├── routes/                # Centralized router entry directory
│   └── Router.jsx         # Modern array-based router definition component
└── App.jsx                # Main application entry point mounting the Router
```
