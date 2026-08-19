const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Node.js CI/CD Dashboard</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px;
    }

    .container {
      width: 100%;
      max-width: 900px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }

    .header {
      text-align: center;
      margin-bottom: 35px;
    }

    .header h1 {
      font-size: 38px;
      margin-bottom: 10px;
    }

    .header p {
      color: #cbd5e1;
      font-size: 17px;
    }

    .status {
      text-align: center;
      margin-bottom: 30px;
    }

    .success {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 30px;
      background: #16a34a;
      font-weight: bold;
    }

    .pipeline {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .card {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: 22px;
      text-align: center;
    }

    .icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    .card h3 {
      margin-bottom: 8px;
    }

    .card p {
      color: #94a3b8;
      font-size: 14px;
    }

    .check {
      color: #22c55e;
      font-weight: bold;
      margin-top: 10px;
    }

    .footer {
      text-align: center;
      margin-top: 35px;
      color: #94a3b8;
      font-size: 14px;
    }

    @media (max-width: 700px) {
      .pipeline {
        grid-template-columns: 1fr;
      }

      .container {
        padding: 25px;
      }

      .header h1 {
        font-size: 28px;
      }
    }
  </style>
</head>

<body>

  <div class="container">

    <div class="header">
      <h1>🚀 Node.js CI/CD Dashboard</h1>
      <p>Application deployed successfully through DevOps pipeline</p>
    </div>

    <div class="status">
      <span class="success">● DEPLOYMENT SUCCESSFUL</span>
    </div>

    <div class="pipeline">

      <div class="card">
        <div class="icon">🐙</div>
        <h3>GitHub</h3>
        <p>Source Code Management</p>
        <div class="check">✓ Connected</div>
      </div>

      <div class="card">
        <div class="icon">🔨</div>
        <h3>Jenkins</h3>
        <p>CI Pipeline</p>
        <div class="check">✓ Build Passed</div>
      </div>

      <div class="card">
        <div class="icon">🔍</div>
        <h3>SonarQube</h3>
        <p>Code Quality Analysis</p>
        <div class="check">✓ Analysis Passed</div>
      </div>

      <div class="card">
        <div class="icon">🐳</div>
        <h3>Docker</h3>
        <p>Containerization</p>
        <div class="check">✓ Image Ready</div>
      </div>

      <div class="card">
        <div class="icon">☸️</div>
        <h3>Kubernetes</h3>
        <p>Container Orchestration</p>
        <div class="check">✓ 2 Replicas Running</div>
      </div>

      <div class="card">
        <div class="icon">🔄</div>
        <h3>Argo CD</h3>
        <p>Continuous Deployment</p>
        <div class="check">✓ Synchronized</div>
      </div>

    </div>

    <div class="footer">
      Node.js Express Application • Kubernetes • Argo CD
    </div>

  </div>

</body>
</html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "node-express-app"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
