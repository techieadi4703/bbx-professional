const fs = require('fs');
const path = require('path');

const replacements = {
  "Strategic Schedule": "My Schedule",
  "Registry Identity": "My Profile",
  "Wallet & Ledger": "Earnings",
  "Collaborator Feedback": "Reviews",
  "Network Feedback": "Reviews",
  "Execute Profile Sync": "Save profile",
  "Profile synchronized! ✨": "Profile updated",
  "Allocate Slot": "Add slot",
  "Slot added to registry! 📅": "Slot added",
  "Liquidate Session": "Log out",
  "Authenticate to Matrix": "Log in",
  "Validating Matrix Sync...": "Signing you in…",
  "Establish Professional Identity": "Create my account",
  "Identity Synchronized": "Account created",
  "Initializing Registry...": "Loading your dashboard…",
  "Trust Quotient": "Rating",
  "Tasks Fulfilled": "Jobs completed",
  "Feedback Loop": "Reviews",
  "Active Presence": "Available",
  "Encrypted \\(Hidden\\)": "Unavailable",
  "Exec. Matrix.": "Dashboard",
  "Control Hub.": "Menu",
  "Operational Sector \\*": "Trade *",
  "Verified Nomenclature": "Full name",
  "Hourly Rate \\(₹\\)": "Hourly rate (₹)",
  "Daily Shift \\(₹\\)": "Day rate (₹)",
  "Federal City": "City",
  "Technical Proficiencies \\(Comma Separatory\\)": "Skills (comma-separated)",
  "Professional Narrative \\(Bio\\)": "About you",
  "Target Date": "Date",
  "Commence": "Start time",
  "Terminate": "End time",
  "Active Manifest": "Upcoming slots",
  "Zero Slots Allocated": "No slots yet",
  "Ledger Beta Access Reserved": "Detailed earnings coming soon",
  "Zero Feedback Logs Detected": "No reviews yet",
  "Verified Operator": "Verified customer",
  "Apply for Registry": "Create an account",
  "Credential Access": "Log in",
  "Professional Identity Email": "Email",
  "Security Key": "Password",
  "Access Denied": "Login failed",
  "Execution & Trades": "EXECUTION & TRADES", 
  "Professional Registry.": "Professional Account.",
  "Professional Access.": "Professional Login.",
};

const dashboardPath = path.join(__dirname, '../src/pages/Dashboard.tsx');
const authPath = path.join(__dirname, '../src/pages/Auth.tsx');
const setupPath = path.join(__dirname, '../src/pages/Setup.tsx');

[dashboardPath, authPath, setupPath].forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  }
  
  if (file.endsWith('Auth.tsx')) {
    content = content.replace(/return profData \? "\/" : "\/setup";/, 'return profData ? "/dashboard" : "/setup";');
    content = content.replace(/navigate\("\/"\)/g, 'navigate("/dashboard")'); // The auth success navigate
  }
  
  if (file.endsWith('Dashboard.tsx')) {
    // navigate("/") in role-mismatch in fetchData()
    content = content.replace(/if \(profileData && profileData\.role !== "professional"\) {\s*navigate\("\/"\);\s*return;\s*}/, 'if (profileData && profileData.role !== "professional") {\n        navigate("/dashboard");\n        return;\n      }');
    // handleLogout uses navigate("/") so keep that as is.
  }
  
  if (file.endsWith('Setup.tsx')) {
    content = content.replace(/navigate\("\/"\)/g, 'navigate("/dashboard")');
    if (!content.includes('import { PROFESSIONS }')) {
      content = content.replace(/const PROFESSIONS = \[\s*[\s\S]*?\];/, '');
      content = content.replace(/import { Reveal, RevealItem } from "@\/components\/shared\/Reveal";/, 'import { Reveal, RevealItem } from "@/components/shared/Reveal";\nimport { PROFESSIONS } from "@/lib/professions";');
    }
  }

  fs.writeFileSync(file, content, 'utf8');
});
