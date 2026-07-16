const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const memberCount = document.querySelector("#member-count");
const errorMessage = document.querySelector("#directory-error");

const membershipNames = {
  1: "Member",
  2: "Silver Member",
  3: "Gold Member"
};

function createMemberCard(member, index) {
  const article = document.createElement("article");
  article.className = "member-card";

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  image.width = 320;
  image.height = 180;
  image.decoding = "async";

  if (index === 0) {
    image.loading = "eager";
    image.fetchPriority = "high";
  } else {
    image.loading = "lazy";
  }

  figure.appendChild(image);

  const content = document.createElement("div");
  content.className = "member-content";

  const category = document.createElement("p");
  category.className = "member-category";
  category.textContent = member.category;

  const heading = document.createElement("h3");
  heading.textContent = member.name;

  const description = document.createElement("p");
  description.className = "member-description";
  description.textContent = member.description;

  const details = document.createElement("ul");
  details.className = "member-details";

  const addressItem = document.createElement("li");
  addressItem.textContent = member.address;

  const phoneItem = document.createElement("li");
  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${member.phone.replace(/[^+\d]/g, "")}`;
  phoneLink.textContent = member.phone;
  phoneItem.appendChild(phoneLink);

  const websiteItem = document.createElement("li");
  const websiteLink = document.createElement("a");
  websiteLink.href = member.website;
  websiteLink.target = "_blank";
  websiteLink.rel = "noopener";
  websiteLink.textContent = "Visit website";
  websiteItem.appendChild(websiteLink);

  details.append(addressItem, phoneItem, websiteItem);

  const membership = document.createElement("span");
  const levelClass = member.membership === 3 ? "gold" : member.membership === 2 ? "silver" : "member";
  membership.className = `membership-badge ${levelClass}`;
  membership.textContent = membershipNames[member.membership] ?? "Member";

  content.append(category, heading, description, details, membership);
  article.append(figure, content);

  return article;
}

function displayMembers(members) {
  const fragment = document.createDocumentFragment();

  members.forEach((member, index) => {
    fragment.appendChild(createMemberCard(member, index));
  });

  membersContainer.replaceChildren(fragment);
  memberCount.textContent = `${members.length} chamber members`;
}

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Could not load member data:", error);
    memberCount.textContent = "Directory unavailable";
    errorMessage.hidden = false;
    errorMessage.textContent = "The member directory could not be loaded. Please refresh the page or try again later.";
  }
}

function setView(view) {
  const useGrid = view === "grid";

  membersContainer.classList.toggle("grid-view", useGrid);
  membersContainer.classList.toggle("list-view", !useGrid);

  gridButton.classList.toggle("active", useGrid);
  listButton.classList.toggle("active", !useGrid);

  gridButton.setAttribute("aria-pressed", String(useGrid));
  listButton.setAttribute("aria-pressed", String(!useGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

getMembers();
