# 🚀 App Graph Builder

A modern interactive application dependency visualization dashboard built using **React**, **TypeScript**, **React Flow (XYFlow)**, **Zustand**, **Tailwind CSS**, and **React Query**.

---

## 📖 Overview

App Graph Builder is a visual infrastructure monitoring dashboard that enables users to create, manage, and monitor application services using an interactive graph interface.

The dashboard simulates real-world system architecture where services such as:

- Frontend Applications
- APIs
- Databases
- Cache Layers
- Worker Services
- Queue Systems

are connected through dependencies.

Users can visualize service relationships, monitor system health, manage nodes, and simulate infrastructure metrics such as CPU and Memory usage.

---

## ✨ Features

### 📊 Interactive Graph Visualization

- React Flow based architecture graph
- Drag and drop node movement
- Connect services using edges
- Zoom and pan support
- MiniMap navigation
- Fit View support
- Auto Arrange support

### ⚙️ Service Management

- Create new services
- Delete services
- Duplicate existing services
- Edit node information
- Dynamic graph updates
- Search services by name

### 📈 Monitoring Dashboard

- Live CPU simulation
- Live Memory simulation
- Automatic status updates
- Service health indicators
- Critical resource alerts
- Real-time visual monitoring

### 🔍 Node Inspector

- Update service name
- Change service status
- Modify CPU usage
- Modify memory usage
- View node metadata
- Runtime information panel

### 🎨 Modern User Interface

- Dark theme dashboard
- Responsive design
- Professional monitoring UI
- Custom node cards
- Status badges
- Toast notifications

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite

### State Management

- Zustand

### Data Fetching

- TanStack React Query

### Graph Visualization

- React Flow (XYFlow)

### UI Components

- Radix UI
- Tailwind CSS

### Additional Libraries

- React Hot Toast
- Dagre Layout Engine

---

## 📂 Project Structure

```text
src
│
├── api
│   └── mockApi.ts
│
├── components
│   │
│   ├── graph
│   │   ├── GraphCanvas.tsx
│   │   └── CustomNode.tsx
│   │
│   ├── inspector
│   │   └── NodeInspector.tsx
│   │
│   ├── layout
│   │   ├── TopBar.tsx
│   │   ├── LeftRail.tsx
│   │   └── AppList.tsx
│   │
│   ├── ui
│   │
│   ├── NodeCreationModal.tsx
│   └── NodeDetailsDialog.tsx
│
├── hooks
│   ├── useApps.ts
│   └── useGraph.ts
│
├── pages
│   └── Dashboard.tsx
│
├── store
│   └── appStore.ts
│
└── types
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/amansharma264/app-graph-builder.git
```

### Navigate to Project

```bash
cd app-graph-builder
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📊 Service Categories

The dashboard supports multiple service categories:

| Category | Description |
|-----------|------------|
| Frontend | User-facing applications |
| API | Backend API services |
| Database | Data storage services |
| Cache | High-speed caching layer |
| Queue | Message queue services |
| Worker | Background processing services |

---

## 📈 Service Status Levels

### 🟢 Healthy

- Service is running normally
- Resource utilization is within limits

### 🟡 Degraded

- High resource utilization detected
- Performance warning generated

### 🔴 Down

- Critical resource threshold reached
- Immediate attention required

---

## 🔔 Monitoring Simulation

The application automatically simulates:

- CPU usage changes
- Memory usage changes
- Health status updates
- Resource alerts
- Critical service notifications

This demonstrates real-world monitoring concepts used in cloud infrastructure platforms.

---

## 🎯 Future Improvements

- Backend Integration
- Authentication System
- Database Persistence
- Team Collaboration
- Cloud Provider Integration
- Real-time Metrics APIs
- Graph Export Features
- Service Dependency Analysis
- Monitoring Dashboard Analytics

---

## 👨‍💻 Author

### Aman Sharma

- BE (Electronics & Telecommunication Engineering)
- Sir M Visvesvaraya Institute of Technology
- Full Stack Developer
- DSA Enthusiast

---

## 📜 License

This project is developed for educational and learning purposes.

---

⭐ If you found this project useful, consider giving it a star on GitHub.