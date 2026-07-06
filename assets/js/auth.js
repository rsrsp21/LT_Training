async function loadUsersData() {
  try {
    const response = await fetch("assets/data/users.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`users.json load failed: ${response.status}`);
    }
    USERS_DATA = await response.json();
  } catch (error) {
    USERS_DATA = [];
    console.error(error);
  }
}

async function loadTrainersData() {
  try {
    const response = await fetch("assets/data/trainers.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`trainers.json load failed: ${response.status}`);
    }
    TRAINERS_DATA = await response.json();
  } catch (error) {
    TRAINERS_DATA = [];
    console.error(error);
  }
}

function renderSampleCredentials() {
  const usersList = getEl("sampleUsersList");
  const managersList = getEl("sampleManagersList");
  if (!usersList || !managersList || !Array.isArray(USERS_DATA)) return;

  const users = USERS_DATA.filter((u) => u.role === "user").slice(0, 2);
  const managers = USERS_DATA.filter((u) => u.role === "manager").slice(0, 2);

  const renderItems = (items) =>
    items
      .map(
        (item) => `
          <div class="sample-cred-item">
            <span><strong>${item.username}</strong></span>
            <span class="label">Password</span>
            <span>${item.password}</span>
          </div>
        `,
      )
      .join("");

  usersList.innerHTML = renderItems(users);
  managersList.innerHTML = renderItems(managers);
}

function handleLogin() {
  const unameEl = getEl("loginUsername");
  const passEl = getEl("loginPassword");
  const errEl = getEl("loginError");
  if (!unameEl || !passEl || !errEl) return;
  if (!USERS_DATA.length) {
    showToast("Unable to load user data. Please refresh and try again.", "error");
    return;
  }

  const uname = unameEl.value.trim();
  const pass = passEl.value;
  const found = USERS_DATA.find((u) => u.username === uname && u.password === pass);

  if (!found) {
    errEl.classList.add("show");
    return;
  }

  errEl.classList.remove("show");
  currentUser = found;
  saveCurrentUser(found);

  if (found.role === "user") {
    globalThis.location.href = "user.html";
  } else {
    globalThis.location.href = "admin.html";
  }
}

function logout() {
  currentUser = null;
  clearCurrentUser();
  sessionStorage.setItem("lt_signed_out", "1");
  globalThis.location.href = "index.html";
}

function guardByRole(expectedRole, fallbackPage) {
  const user = getCurrentUser();
  if (!user) {
    globalThis.location.href = "index.html";
    return false;
  }
  if (user.role !== expectedRole) {
    globalThis.location.href = fallbackPage;
    return false;
  }
  currentUser = user;
  return true;
}
