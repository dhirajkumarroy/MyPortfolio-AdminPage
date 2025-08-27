
// const API_BASE = "https://dhiraj-my-portfolio-api.onrender.com/api";

// // 🔑 Add JWT automatically
// function getAuthHeaders() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("Unauthorized! Please login again.");
//     window.location.href = "login.html";
//     return {}; // Return empty object to prevent further errors
//   }
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// }

// // 🚪 Logout
// function logout() {
//   localStorage.removeItem("token");
//   window.location.href = "login.html";
// }

// // =========================================================
// // UI INTERACTIVITY
// // =========================================================

// // Toggle sidebar on mobile
// document.querySelector(".menu-toggle").addEventListener("click", function () {
//   document.querySelector(".sidebar").classList.toggle("active");
// });

// // Switch between sections
// document.querySelectorAll(".menu-item").forEach((item) => {
//   item.addEventListener("click", function () {
//     // Update active menu item
//     document
//       .querySelectorAll(".menu-item")
//       .forEach((i) => i.classList.remove("active"));
//     this.classList.add("active");

//     // Show the corresponding section
//     const section = this.getAttribute("data-section");
//     document
//       .querySelectorAll(".content-section")
//       .forEach((s) => (s.style.display = "none"));
//     document.getElementById(`${section}-section`).style.display = "block";
//   });
// });

// // =========================================================
// // PROJECTS
// // =========================================================

// // 📂 Create Project
// document
//   .getElementById("project-form")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const project = {
//       title: document.getElementById("title").value,
//       description: document.getElementById("description").value,
//       githubLink: document.getElementById("url").value,
//       imageURL: document.getElementById("image").value,
//       techStack: document
//         .getElementById("techStack")
//         .value.split(",")
//         .map((tech) => tech.trim()),
//     };

//     // Show loading state
//     const submitBtn = e.target.querySelector('button[type="submit"]');
//     const originalText = submitBtn.innerHTML;
//     submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
//     submitBtn.disabled = true;

//     try {
//       const res = await fetch(`${API_BASE}/projects`, {
//         method: "POST",
//         headers: getAuthHeaders(),
//         body: JSON.stringify(project),
//       });

//       if (res.ok) {
//         loadProjects();
//         e.target.reset();
//       } else {
//         alert("❌ Failed to add project");
//       }
//     } catch (error) {
//       alert("❌ Network error: " + error.message);
//     } finally {
//       submitBtn.innerHTML = originalText;
//       submitBtn.disabled = false;
//     }
//   });

// // 📂 Fetch Projects
// async function loadProjects() {
//   const list = document.getElementById("projects-list");
//   list.innerHTML = '<div class="spinner"></div>';

//   try {
//     const res = await fetch(`${API_BASE}/projects`, {
//       headers: getAuthHeaders(),
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     const projects = data.content || data;

//     if (projects.length === 0) {
//       list.innerHTML = `
//             <div class="empty-state">
//               <i class="fas fa-project-diagram"></i>
//               <h3>No Projects Yet</h3>
//               <p>Add your first project using the form above</p>
//             </div>
//           `;
//       return;
//     }

//     list.innerHTML = projects
//       .map(
//         (p) => `<div class="item-card">
//                   <div class="item-info">
//                     <h3>${p.title}</h3>
//                     <p>${p.description}</p>
//                     ${
//                       p.url
//                         ? `<a href="${p.url}" target="_blank">${p.url}</a>`
//                         : ""
//                     }
//                   </div>
//                   <div class="item-actions">
//                     <button class="btn btn-danger" onclick="deleteProject(${
//                       p.id
//                     })">
//                       <i class="fas fa-trash"></i>
//                     </button>
//                     <button class="btn btn-warning" onclick="handleEditProject(${
//                       p.id
//                     }, '${p.title.replace(
//           /'/g,
//           "\\'"
//         )}', '${p.description.replace(/'/g, "\\'")}', '${
//           p.url ? p.url.replace(/'/g, "\\'") : ""
//         }')">
//                       <i class="fas fa-edit"></i>
//                     </button>
//                   </div>
//                 </div>`
//       )
//       .join("");
//   } catch (error) {
//     list.innerHTML = `
//           <div class="empty-state">
//             <i class="fas fa-exclamation-circle"></i>
//             <h3>Failed to load projects</h3>
//             <p>${error.message}</p>
//           </div>
//         `;
//   }
// }

// // 📂 Delete Project
// async function deleteProject(id) {
//   if (!confirm("Are you sure you want to delete this project?")) return;

//   try {
//     const res = await fetch(`${API_BASE}/projects/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });

//     if (res.ok) {
//       loadProjects();
//     } else {
//       alert("❌ Failed to delete project");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   }
// }

// // 🔄 Update a Project
// async function updateProject(id, projectData) {
//   try {
//     const res = await fetch(`${API_BASE}/projects/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(projectData),
//     });

//     if (res.ok) {
//       alert("Project updated successfully!");
//       loadProjects();
//     } else {
//       const errorText = await res.text();
//       alert(`❌ Failed to update project: ${errorText}`);
//     }
//   } catch (error) {
//     console.error("Failed to update project:", error);
//   }
// }

// // Helper function to handle project editing
// function handleEditProject(id, title, description, url) {
//   const newTitle = prompt("Enter new title:", title);
//   if (newTitle === null) return;

//   const newDescription = prompt("Enter new description:", description);
//   if (newDescription === null) return;

//   const newUrl = prompt("Enter new URL:", url);
//   if (newUrl === null) return;

//   const updatedProject = {
//     id: id,
//     title: newTitle,
//     description: newDescription,
//     githubLink: newUrl,
//   };

//   updateProject(id, updatedProject);
// }

// // =========================================================
// // SKILLS
// // =========================================================

// // 🛠 Add Skill
// document.getElementById("skill-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const skill = {
//     name: document.getElementById("skillName").value,
//     level: document.getElementById("level").value,
//     category: document.getElementById("category").value
//   };

//   // Show loading state
//   const submitBtn = e.target.querySelector('button[type="submit"]');
//   const originalText = submitBtn.innerHTML;
//   submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
//   submitBtn.disabled = true;

//   try {
//     const res = await fetch(`${API_BASE}/skills`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(skill),
//     });

//     if (res.ok) {
//       loadSkills();
//       e.target.reset();
//     } else {
//       alert("❌ Failed to add skill");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   } finally {
//     submitBtn.innerHTML = originalText;
//     submitBtn.disabled = false;
    
//     // Animate skill bars
//     const skillItem = document.querySelector(`.skill-item[data-id="${skill.id}"]`);
//     if (skillItem) {
//         const skillLevel = skillItem.getAttribute("data-level");
//         const skillProgress = skillItem.querySelector(".skill-progress");
//         if (skillProgress) {
//             setTimeout(() => {
//                 skillProgress.style.width = skillLevel;
//             }, 300);
//         }
//     }
//   }
// });

// // 🛠 Fetch Skills
// async function loadSkills() {
//   const list = document.getElementById("skills-list");
//   list.innerHTML = '<div class="spinner"></div>';

//   try {
//     const res = await fetch(`${API_BASE}/skills`, {
//       headers: getAuthHeaders(),
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const skills = await res.json();

//     if (skills.length === 0) {
//       list.innerHTML = `
//             <div class="empty-state">
//               <i class="fas fa-tools"></i>
//               <h3>No Skills Yet</h3>
//               <p>Add your first skill using the form above</p>
//             </div>
//           `;
//       return;
//     }

//     list.innerHTML = skills
//       .map(
//         (s) => `<div class="item-card">
//                   <div class="item-info">
//                     <h3>${s.name}</h3>
//                     <p>Level: ${s.level}</p>
//                   </div>
//                   <div class="item-actions">
//                     <button class="btn btn-danger" onclick="deleteSkill(${
//                       s.id
//                     })">
//                       <i class="fas fa-trash"></i>
//                     </button>
//                     <button class="btn btn-warning" onclick="handleEditSkill(${
//                       s.id
//                     }, '${s.name.replace(/'/g, "\\'")}', '${s.level.replace(
//           /'/g,
//           "\\'"
//         )}')">
//                       <i class="fas fa-edit"></i>
//                     </button>
//                   </div>
//                 </div>`
//       )
//       .join("");
//   } catch (error) {
//     list.innerHTML = `
//           <div class="empty-state">
//             <i class="fas fa-exclamation-circle"></i>
//             <h3>Failed to load skills</h3>
//             <p>${error.message}</p>
//           </div>
//         `;
//   }
// }

// // 🛠 Delete Skill
// async function deleteSkill(id) {
//   if (!confirm("Are you sure you want to delete this skill?")) return;

//   try {
//     const res = await fetch(`${API_BASE}/skills/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });

//     if (res.ok) {
//       loadSkills();
//     } else {
//       alert("❌ Failed to delete skill");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   }
// }

// // 🔄 Update a Skill
// async function updateSkill(id, skillData) {
//   try {
//     const res = await fetch(`${API_BASE}/skills/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(skillData),
//     });

//     if (res.ok) {
//       alert("Skill updated successfully!");
//       loadSkills();
//     } else {
//       const errorText = await res.text();
//       alert(`❌ Failed to update skill: ${errorText}`);
//     }
//   } catch (error) {
//     console.error("Failed to update skill:", error);
//   }
// }

// // Helper function to handle skill editing
// function handleEditSkill(id, name, level) {
//   const newName = prompt("Enter new skill name:", name);
//   if (newName === null) return;

//   const newLevel = prompt("Enter new skill level:", level);
//   if (newLevel === null) return;

//   const updatedSkill = {
//     id: id,
//     name: newName,
//     level: newLevel,
//   };

//   updateSkill(id, updatedSkill);
// }

// // =========================================================
// // CERTIFICATIONS
// // =========================================================

// // 🎓 Add Certification
// document.getElementById("certification-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const certification = {
//     name: document.getElementById("certName").value,
//     issuingOrganization: document.getElementById("issuingOrganization").value,
//     issueDate: document.getElementById("issueDate").value,
//     expiryDate: document.getElementById("expiryDate").value || null,
//     url: document.getElementById("certUrl").value || null
//   };
  
//   // Show loading state
//   const submitBtn = e.target.querySelector('button[type="submit"]');
//   const originalText = submitBtn.innerHTML;
//   submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
//   submitBtn.disabled = true;

//   try {
//     const res = await fetch(`${API_BASE}/certifications`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(certification),
//     });

//     if (res.ok) {
//       loadCertifications();
//       e.target.reset();
//     } else {
//       alert("❌ Failed to add certification");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   } finally {
//     submitBtn.innerHTML = originalText;
//     submitBtn.disabled = false;
//   }
// });

// // 🎓 Fetch Certifications
// async function loadCertifications() {
//   const list = document.getElementById("certifications-list");
//   list.innerHTML = '<div class="spinner"></div>';

//   try {
//     const res = await fetch(`${API_BASE}/certifications`, {
//       headers: getAuthHeaders(),
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     const certifications = data.content || data;

//     if (certifications.length === 0) {
//       list.innerHTML = `
//             <div class="empty-state">
//               <i class="fas fa-certificate"></i>
//               <h3>No Certifications Yet</h3>
//               <p>Add your first certification using the form above</p>
//             </div>
//           `;
//       return;
//     }

//     list.innerHTML = certifications
//       .map(
//         (c) => `<div class="item-card">
//                   <div class="item-info">
//                     <h3>${c.name}</h3>
//                     <p>Issuer: ${c.issuingOrganization}</p>
//                     <p>Issue Date: ${c.issueDate}</p>
//                     ${c.url ? `<p><a href="${c.url}" target="_blank">View Credential</a></p>` : ""}
//                   </div>
//                   <div class="item-actions">
//                     <button class="btn btn-danger" onclick="deleteCertification(${c.id})">
//                       <i class="fas fa-trash"></i>
//                     </button>
//                     <button class="btn btn-warning" onclick="handleEditCertification(${c.id}, '${c.name.replace(/'/g, "\\'")}', '${c.issuingOrganization.replace(/'/g, "\\'")}', '${c.issueDate}', '${c.expiryDate}', '${c.url ? c.url.replace(/'/g, "\\'") : ''}')">
//                       <i class="fas fa-edit"></i>
//                     </button>
//                   </div>
//                 </div>`
//       )
//       .join("");
//   } catch (error) {
//     list.innerHTML = `
//           <div class="empty-state">
//             <i class="fas fa-exclamation-circle"></i>
//             <h3>Failed to load certifications</h3>
//             <p>${error.message}</p>
//           </div>
//         `;
//   }
// }

// // 🎓 Delete Certification
// async function deleteCertification(id) {
//   if (!confirm("Are you sure you want to delete this certification?")) return;

//   try {
//     const res = await fetch(`${API_BASE}/certifications/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });

//     if (res.ok) {
//       loadCertifications();
//     } else {
//       alert("❌ Failed to delete certification");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   }
// }

// // 🔄 Update a Certification
// async function updateCertification(id, certificationData) {
//   try {
//     const res = await fetch(`${API_BASE}/certifications/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(certificationData),
//     });

//     if (res.ok) {
//       alert("Certification updated successfully!");
//       loadCertifications();
//     } else {
//       const errorText = await res.text();
//       alert(`❌ Failed to update certification: ${errorText}`);
//     }
//   } catch (error) {
//     console.error("Failed to update certification:", error);
//   }
// }

// // Helper function to handle certification editing
// function handleEditCertification(id, name, issuingOrganization, issueDate, expiryDate, url) {
//   const newName = prompt("Enter new name:", name);
//   if (newName === null) return;
//   const newIssuer = prompt("Enter new issuing organization:", issuingOrganization);
//   if (newIssuer === null) return;
//   const newIssueDate = prompt("Enter new issue date (YYYY-MM-DD):", issueDate);
//   if (newIssueDate === null) return;
//   const newExpiryDate = prompt("Enter new expiry date (YYYY-MM-DD):", expiryDate || "");
//   const newUrl = prompt("Enter new URL:", url || "");

//   const updatedCertification = {
//     id: id,
//     name: newName,
//     issuingOrganization: newIssuer,
//     issueDate: newIssueDate,
//     expiryDate: newExpiryDate || null,
//     url: newUrl || null
//   };

//   updateCertification(id, updatedCertification);
// }

// // =========================================================
// // EDUCATION
// // =========================================================

// // 📚 Add Education
// document.getElementById("education-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const education = {
//     institution: document.getElementById("institution").value,
//     degree: document.getElementById("degree").value,
//     fieldOfStudy: document.getElementById("fieldOfStudy").value || null,
//     startDate: document.getElementById("startDate").value,
//     endDate: document.getElementById("endDate").value || null,
//     grade: document.getElementById("grade").value || null,
//     description: document.getElementById("description").value || null
//   };

//   // Show loading state
//   const submitBtn = e.target.querySelector('button[type="submit"]');
//   const originalText = submitBtn.innerHTML;
//   submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
//   submitBtn.disabled = true;

//   try {
//     const res = await fetch(`${API_BASE}/education`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(education),
//     });

//     if (res.ok) {
//       loadEducation();
//       e.target.reset();
//     } else {
//       alert("❌ Failed to add education record");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   } finally {
//     submitBtn.innerHTML = originalText;
//     submitBtn.disabled = false;
//   }
// });

// // 📚 Fetch Education
// async function loadEducation() {
//   const list = document.getElementById("education-list");
//   list.innerHTML = '<div class="spinner"></div>';

//   try {
//     const res = await fetch(`${API_BASE}/education`, {
//       headers: getAuthHeaders(),
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     const educationRecords = data.content || data;

//     if (educationRecords.length === 0) {
//       list.innerHTML = `
//             <div class="empty-state">
//               <i class="fas fa-graduation-cap"></i>
//               <h3>No Education Records Yet</h3>
//               <p>Add your first education record using the form above</p>
//             </div>
//           `;
//       return;
//     }

//     list.innerHTML = educationRecords
//       .map(
//         (e) => `<div class="item-card">
//                   <div class="item-info">
//                     <h3>${e.institution}</h3>
//                     <p>Degree: ${e.degree}</p>
//                     <p>Dates: ${e.startDate} - ${e.endDate || 'Present'}</p>
//                   </div>
//                   <div class="item-actions">
//                     <button class="btn btn-danger" onclick="deleteEducation(${e.id})">
//                       <i class="fas fa-trash"></i>
//                     </button>
//                     <button class="btn btn-warning" onclick="handleEditEducation(${e.id}, '${e.institution.replace(/'/g, "\\'")}', '${e.degree.replace(/'/g, "\\'")}', '${e.fieldOfStudy || ''}', '${e.startDate}', '${e.endDate || ''}', '${e.grade || ''}', '${e.description || ''}')">
//                       <i class="fas fa-edit"></i>
//                     </button>
//                   </div>
//                 </div>`
//       )
//       .join("");
//   } catch (error) {
//     list.innerHTML = `
//           <div class="empty-state">
//             <i class="fas fa-exclamation-circle"></i>
//             <h3>Failed to load education records</h3>
//             <p>${error.message}</p>
//           </div>
//         `;
//   }
// }

// // 📚 Delete Education
// async function deleteEducation(id) {
//   if (!confirm("Are you sure you want to delete this education record?")) return;

//   try {
//     const res = await fetch(`${API_BASE}/education/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });

//     if (res.ok) {
//       loadEducation();
//     } else {
//       alert("❌ Failed to delete education record");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   }
// }

// // 🔄 Update Education
// async function updateEducation(id, educationData) {
//   try {
//     const res = await fetch(`${API_BASE}/education/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(educationData),
//     });

//     if (res.ok) {
//       alert("Education record updated successfully!");
//       loadEducation();
//     } else {
//       const errorText = await res.text();
//       alert(`❌ Failed to update education record: ${errorText}`);
//     }
//   } catch (error) {
//     console.error("Failed to update education record:", error);
//   }
// }

// // Helper function to handle education editing
// function handleEditEducation(id, institution, degree, fieldOfStudy, startDate, endDate, grade, description) {
//   const newInstitution = prompt("Enter new institution:", institution);
//   if (newInstitution === null) return;
//   const newDegree = prompt("Enter new degree:", degree);
//   if (newDegree === null) return;
//   const newFieldOfStudy = prompt("Enter new field of study:", fieldOfStudy || "");
//   const newStartDate = prompt("Enter new start date (YYYY-MM-DD):", startDate);
//   if (newStartDate === null) return;
//   const newEndDate = prompt("Enter new end date (YYYY-MM-DD):", endDate || "");
//   const newGrade = prompt("Enter new grade:", grade || "");
//   const newDescription = prompt("Enter new description:", description || "");

//   const updatedEducation = {
//     id: id,
//     institution: newInstitution,
//     degree: newDegree,
//     fieldOfStudy: newFieldOfStudy,
//     startDate: newStartDate,
//     endDate: newEndDate || null,
//     grade: newGrade || null,
//     description: newDescription || null
//   };

//   updateEducation(id, updatedEducation);
// }


// // =========================================================
// // RESUME
// // =========================================================

// // 📄 Upload/Update Resume
// document.getElementById("resume-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const fileInput = document.getElementById("resumeUrl");
//   if (!fileInput.files.length) {
//     alert("Please select a file to upload.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", fileInput.files[0]);

//   // Show loading state
//   const submitBtn = e.target.querySelector('button[type="submit"]');
//   const originalText = submitBtn.innerHTML;
//   submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
//   submitBtn.disabled = true;

//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API_BASE}/resumes`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${token}`
//       },
//       body: formData,
//     });

//     if (res.ok) {
//       loadResume();
//       e.target.reset();
//       alert("✅ Resume uploaded successfully!");
//     } else {
//       const errorText = await res.text();
//       alert(`❌ Failed to upload resume: ${errorText}`);
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   } finally {
//     submitBtn.innerHTML = originalText;
//     submitBtn.disabled = false;
//   }
// });

// // 📄 Fetch Resume
// async function loadResume() {
//   const list = document.getElementById("resume-list");
//   if (!list) return; // Add check to prevent error

//   list.innerHTML = '<div class="spinner"></div>';

//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API_BASE}/resumes`, {
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     const resumes = data.content || data;

//     if (resumes.length === 0) {
//       list.innerHTML = `
//         <div class="empty-state">
//           <i class="fas fa-file-alt"></i>
//           <h3>No Resume Found</h3>
//           <p>Upload your resume using the form above.</p>
//         </div>
//       `;
//       return;
//     }

//     // Assuming you only manage a single resume file for simplicity
//     const resume = resumes[0]; 

//     list.innerHTML = `
//       <div class="item-card">
//         <div class="item-info">
//           <h3>Current Resume</h3>
//           <p><b>File ID:</b> ${resume.id}</p>
//           <p><a href="${API_BASE}/resumes/download/${resume.id}" target="_blank">View Resume</a></p>
//         </div>
//         <div class="item-actions">
//           <button class="btn btn-danger" onclick="deleteResume(${resume.id})">
//             <i class="fas fa-trash"></i>
//           </button>
//         </div>
//       </div>
//     `;
//   } catch (error) {
//     list.innerHTML = `
//       <div class="empty-state">
//         <i class="fas fa-exclamation-circle"></i>
//         <h3>Failed to load resume</h3>
//         <p>${error.message}</p>
//       </div>
//     `;
//   }
// }

// // 📄 Delete Resume
// async function deleteResume(id) {
//   if (!confirm("Are you sure you want to delete this resume?")) return;

//   try {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API_BASE}/resumes/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     });

//     if (res.ok) {
//       loadResume();
//       alert("Resume deleted successfully!");
//     } else {
//       alert("❌ Failed to delete resume");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   }
// }


// // =========================================================
// // MESSAGES
// // =========================================================

// // 📩 Fetch Messages
// async function loadMessages() {
//   const list = document.getElementById("messages-list");
//   list.innerHTML = '<div class="spinner"></div>';

//   try {
//     const res = await fetch(`${API_BASE}/messages`, {
//       headers: getAuthHeaders(),
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const messages = await res.json();

//     if (messages.length === 0) {
//       list.innerHTML = `
//             <div class="empty-state">
//               <i class="fas fa-envelope"></i>
//               <h3>No Messages Yet</h3>
//               <p>You don't have any messages yet</p>
//             </div>
//           `;
//       return;
//     }

//     list.innerHTML = messages
//       .map(
//         (m) => `<div class="item-card">
//                   <div class="item-info">
//                     <h3>${m.name} (${m.email})</h3>
//                     <p>${m.message}</p>
//                     <small>${new Date(
//                       m.createdAt || Date.now()
//                     ).toLocaleString()}</small>
//                   </div>
//                   <div class="item-actions">
//                     <button class="btn btn-danger" onclick="deleteMessage(${
//                       m.id
//                     })">
//                       <i class="fas fa-trash"></i>
//                     </button>
//                   </div>
//                 </div>`
//       )
//       .join("");
//   } catch (error) {
//     list.innerHTML = `
//           <div class="empty-state">
//             <i class="fas fa-exclamation-circle"></i>
//             <h3>Failed to load messages</h3>
//             <p>${error.message}</p>
//           </div>
//         `;
//   }
// }

// // 📩 Delete Message
// async function deleteMessage(id) {
//   if (!confirm("Are you sure you want to delete this message?")) return;

//   try {
//     const res = await fetch(`${API_BASE}/messages/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });

//     if (res.ok) {
//       loadMessages();
//     } else {
//       alert("❌ Failed to delete message");
//     }
//   } catch (error) {
//     alert("❌ Network error: " + error.message);
//   }
// }

// // =========================================================
// // PAGE LOAD
// // =========================================================

// // 🚀 Load everything when page opens
// window.onload = () => {
//   loadProjects();
//   loadSkills();
//   loadCertifications(); // Load certifications
//   loadEducation(); // Load education
//   loadResume(); // Load resume
//   loadMessages();
// };


const API_BASE = "https://dhiraj-my-portfolio-api.onrender.com/api";

// 🔑 Add JWT automatically
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Alert is a bad practice in modern JS, but for a simple admin panel it's ok
    alert("Unauthorized! Please login again.");
    window.location.href = "login.html";
    return {};
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// =========================================================
// UI INTERACTIVITY
// =========================================================

// Toggle sidebar on mobile
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("active");
});

// Switch between sections
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Update active menu item
    document
      .querySelectorAll(".menu-item")
      .forEach((i) => i.classList.remove("active"));
    this.classList.add("active");

    // Show the corresponding section
    const section = this.getAttribute("data-section");
    document
      .querySelectorAll(".content-section")
      .forEach((s) => (s.style.display = "none"));
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
      targetSection.style.display = "block";
    }
  });
});

// =========================================================
// PROJECTS
// =========================================================

// 📂 Create Project
document.getElementById("project-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const project = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      githubLink: document.getElementById("url").value,
      imageURL: document.getElementById("image").value,
      techStack: document
        .getElementById("techStack")
        .value.split(",")
        .map((tech) => tech.trim()),
    };

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(project),
      });

      if (res.ok) {
        loadProjects();
        e.target.reset();
      } else {
        alert("❌ Failed to add project");
      }
    } catch (error) {
      alert("❌ Network error: " + error.message);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

// 📂 Fetch Projects
async function loadProjects() {
  const list = document.getElementById("projects-list");
  if (!list) return;
  list.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const projects = data.content;

    if (!projects || projects.length === 0) {
      list.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-project-diagram"></i>
              <h3>No Projects Yet</h3>
              <p>Add your first project using the form above</p>
            </div>
          `;
      return;
    }

    list.innerHTML = projects
      .map(
        (p) => `<div class="item-card">
                  <div class="item-info">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    ${
                      p.url
                        ? `<a href="${p.url}" target="_blank">${p.url}</a>`
                        : ""
                    }
                  </div>
                  <div class="item-actions">
                    <button class="btn btn-danger delete-project-btn" data-id="${p.id}">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-warning edit-project-btn" data-id="${p.id}"
                     data-title="${p.title}" data-description="${p.description}" data-url="${p.url}">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>`
      )
      .join("");
  } catch (error) {
    list.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Failed to load projects</h3>
            <p>${error.message}</p>
          </div>
        `;
  }
}

// 📂 Delete Project
async function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      loadProjects();
    } else {
      alert("❌ Failed to delete project");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  }
}

// 🔄 Update a Project
async function updateProject(id, projectData) {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData),
    });

    if (res.ok) {
      alert("Project updated successfully!");
      loadProjects();
    } else {
      const errorText = await res.text();
      alert(`❌ Failed to update project: ${errorText}`);
    }
  } catch (error) {
    console.error("Failed to update project:", error);
  }
}

// Helper function to handle project editing
function handleEditProject(id, title, description, url) {
  const newTitle = prompt("Enter new title:", title);
  if (newTitle === null) return;

  const newDescription = prompt("Enter new description:", description);
  if (newDescription === null) return;

  const newUrl = prompt("Enter new URL:", url);
  if (newUrl === null) return;

  const updatedProject = {
    id: id,
    title: newTitle,
    description: newDescription,
    githubLink: newUrl,
  };

  updateProject(id, updatedProject);
}

// =========================================================
// SKILLS
// =========================================================

// 🛠 Add Skill
document.getElementById("skill-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const skill = {
    name: document.getElementById("skillName").value,
    level: document.getElementById("level").value,
    category: document.getElementById("category").value
  };

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
  submitBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/skills`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(skill),
    });

    if (res.ok) {
      loadSkills();
      e.target.reset();
    } else {
      alert("❌ Failed to add skill");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// 🛠 Fetch Skills
async function loadSkills() {
  const list = document.getElementById("skills-list");
  if (!list) return;
  list.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`${API_BASE}/skills`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const skills = data.content;

    if (!skills || skills.length === 0) {
      list.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-tools"></i>
              <h3>No Skills Yet</h3>
              <p>Add your first skill using the form above</p>
            </div>
          `;
      return;
    }

    list.innerHTML = skills
      .map(
        (s) => `<div class="item-card">
                  <div class="item-info">
                    <h3>${s.name}</h3>
                    <p>Level: ${s.level}</p>
                  </div>
                  <div class="item-actions">
                    <button class="btn btn-danger delete-skill-btn" data-id="${s.id}">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-warning edit-skill-btn" data-id="${s.id}" data-name="${s.name}" data-level="${s.level}">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>`
      )
      .join("");
  } catch (error) {
    list.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Failed to load skills</h3>
            <p>${error.message}</p>
          </div>
        `;
  }
}

// 🛠 Delete Skill
async function deleteSkill(id) {
  if (!confirm("Are you sure you want to delete this skill?")) return;

  try {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      loadSkills();
    } else {
      alert("❌ Failed to delete skill");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  }
}

// 🔄 Update a Skill
async function updateSkill(id, skillData) {
  try {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData),
    });

    if (res.ok) {
      alert("Skill updated successfully!");
      loadSkills();
    } else {
      const errorText = await res.text();
      alert(`❌ Failed to update skill: ${errorText}`);
    }
  } catch (error) {
    console.error("Failed to update skill:", error);
  }
}

// Helper function to handle skill editing
function handleEditSkill(id, name, level) {
  const newName = prompt("Enter new skill name:", name);
  if (newName === null) return;

  const newLevel = prompt("Enter new skill level:", level);
  if (newLevel === null) return;

  const updatedSkill = {
    id: id,
    name: newName,
    level: newLevel,
  };

  updateSkill(id, updatedSkill);
}

// =========================================================
// CERTIFICATIONS
// =========================================================

// 🎓 Add Certification
document.getElementById("certification-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const certification = {
    name: document.getElementById("certName").value,
    issuingOrganization: document.getElementById("issuingOrganization").value,
    issueDate: document.getElementById("issueDate").value,
    expiryDate: document.getElementById("expiryDate").value || null,
    url: document.getElementById("certUrl").value || null
  };
  
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
  submitBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/certifications`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(certification),
    });

    if (res.ok) {
      loadCertifications();
      e.target.reset();
    } else {
      alert("❌ Failed to add certification");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// 🎓 Fetch Certifications
async function loadCertifications() {
  const list = document.getElementById("certifications-list");
  if (!list) return;
  list.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`${API_BASE}/certifications`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const certifications = data.content;

    if (!certifications || certifications.length === 0) {
      list.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-certificate"></i>
              <h3>No Certifications Yet</h3>
              <p>Add your first certification using the form above</p>
            </div>
          `;
      return;
    }

    list.innerHTML = certifications
      .map(
        (c) => `<div class="item-card">
                  <div class="item-info">
                    <h3>${c.name}</h3>
                    <p>Issuer: ${c.issuingOrganization}</p>
                    <p>Issue Date: ${c.issueDate}</p>
                    ${c.url ? `<p><a href="${c.url}" target="_blank">View Credential</a></p>` : ""}
                  </div>
                  <div class="item-actions">
                    <button class="btn btn-danger delete-cert-btn" data-id="${c.id}">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-warning edit-cert-btn" data-id="${c.id}" data-name="${c.name}"
                      data-org="${c.issuingOrganization}" data-issue="${c.issueDate}" data-expiry="${c.expiryDate}" data-url="${c.url}">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>`
      )
      .join("");
  } catch (error) {
    list.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Failed to load certifications</h3>
            <p>${error.message}</p>
          </div>
        `;
  }
}

// 🎓 Delete Certification
async function deleteCertification(id) {
  if (!confirm("Are you sure you want to delete this certification?")) return;

  try {
    const res = await fetch(`${API_BASE}/certifications/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      loadCertifications();
    } else {
      alert("❌ Failed to delete certification");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  }
}

// 🔄 Update a Certification
async function updateCertification(id, certificationData) {
  try {
    const res = await fetch(`${API_BASE}/certifications/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(certificationData),
    });

    if (res.ok) {
      alert("Certification updated successfully!");
      loadCertifications();
    } else {
      const errorText = await res.text();
      alert(`❌ Failed to update certification: ${errorText}`);
    }
  } catch (error) {
    console.error("Failed to update certification:", error);
  }
}

// Helper function to handle certification editing
function handleEditCertification(id, name, issuingOrganization, issueDate, expiryDate, url) {
  const newName = prompt("Enter new name:", name);
  if (newName === null) return;
  const newIssuer = prompt("Enter new issuing organization:", issuingOrganization);
  if (newIssuer === null) return;
  const newIssueDate = prompt("Enter new issue date (YYYY-MM-DD):", issueDate);
  if (newIssueDate === null) return;
  const newExpiryDate = prompt("Enter new expiry date (YYYY-MM-DD):", expiryDate || "");
  const newUrl = prompt("Enter new URL:", url || "");

  const updatedCertification = {
    id: id,
    name: newName,
    issuingOrganization: newIssuer,
    issueDate: newIssueDate,
    expiryDate: newExpiryDate || null,
    url: newUrl || null
  };

  updateCertification(id, updatedCertification);
}

// =========================================================
// EDUCATION
// =========================================================

// 📚 Add Education
document.getElementById("education-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const education = {
    institution: document.getElementById("institution").value,
    degree: document.getElementById("degree").value,
    fieldOfStudy: document.getElementById("fieldOfStudy").value || null,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value || null,
    grade: document.getElementById("grade").value || null,
    description: document.getElementById("description").value || null
  };

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
  submitBtn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/education`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(education),
    });

    if (res.ok) {
      loadEducation();
      e.target.reset();
    } else {
      alert("❌ Failed to add education record");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// 📚 Fetch Education
async function loadEducation() {
  const list = document.getElementById("education-list");
  if (!list) return;
  list.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`${API_BASE}/education`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const educationRecords = data.content;

    if (!educationRecords || educationRecords.length === 0) {
      list.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-graduation-cap"></i>
              <h3>No Education Records Yet</h3>
              <p>Add your first education record using the form above</p>
            </div>
          `;
      return;
    }

    list.innerHTML = educationRecords
      .map(
        (e) => `<div class="item-card">
                  <div class="item-info">
                    <h3>${e.institution}</h3>
                    <p>Degree: ${e.degree}</p>
                    <p>Dates: ${e.startDate} - ${e.endDate || 'Present'}</p>
                  </div>
                  <div class="item-actions">
                    <button class="btn btn-danger delete-edu-btn" data-id="${e.id}">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-warning edit-edu-btn" data-id="${e.id}" data-institution="${e.institution}"
                     data-degree="${e.degree}" data-field="${e.fieldOfStudy || ''}" data-start="${e.startDate}"
                     data-end="${e.endDate || ''}" data-grade="${e.grade || ''}" data-description="${e.description || ''}">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>`
      )
      .join("");
  } catch (error) {
    list.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Failed to load education records</h3>
            <p>${error.message}</p>
          </div>
        `;
  }
}

// 📚 Delete Education
async function deleteEducation(id) {
  if (!confirm("Are you sure you want to delete this education record?")) return;

  try {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      loadEducation();
    } else {
      alert("❌ Failed to delete education record");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  }
}

// 🔄 Update Education
async function updateEducation(id, educationData) {
  try {
    const res = await fetch(`${API_BASE}/education/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(educationData),
    });

    if (res.ok) {
      alert("Education record updated successfully!");
      loadEducation();
    } else {
      const errorText = await res.text();
      alert(`❌ Failed to update education record: ${errorText}`);
    }
  } catch (error) {
    console.error("Failed to update education record:", error);
  }
}

// Helper function to handle education editing
function handleEditEducation(id, institution, degree, fieldOfStudy, startDate, endDate, grade, description) {
  const newInstitution = prompt("Enter new institution:", institution);
  if (newInstitution === null) return;
  const newDegree = prompt("Enter new degree:", degree);
  if (newDegree === null) return;
  const newFieldOfStudy = prompt("Enter new field of study:", fieldOfStudy || "");
  const newStartDate = prompt("Enter new start date (YYYY-MM-DD):", startDate);
  if (newStartDate === null) return;
  const newEndDate = prompt("Enter new end date (YYYY-MM-DD):", endDate || "");
  const newGrade = prompt("Enter new grade:", grade || "");
  const newDescription = prompt("Enter new description:", description || "");

  const updatedEducation = {
    id: id,
    institution: newInstitution,
    degree: newDegree,
    fieldOfStudy: newFieldOfStudy,
    startDate: newStartDate,
    endDate: newEndDate || null,
    grade: newGrade || null,
    description: newDescription || null
  };

  updateEducation(id, updatedEducation);
}


// =========================================================
// RESUME
// =========================================================

// 📄 Upload/Update Resume
document.getElementById("resume-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("resumeUrl");
  if (!fileInput.files.length) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
  submitBtn.disabled = true;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/resumes`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    if (res.ok) {
      loadResume();
      e.target.reset();
      alert("✅ Resume uploaded successfully!");
    } else {
      const errorText = await res.text();
      alert(`❌ Failed to upload resume: ${errorText}`);
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// 📄 Fetch Resume
async function loadResume() {
  const list = document.getElementById("resume-list");
  if (!list) return;
  list.innerHTML = '<div class="spinner"></div>';

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/resumes`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const resumes = data.content;

    if (!resumes || resumes.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-file-alt"></i>
          <h3>No Resume Found</h3>
          <p>Upload your resume using the form above.</p>
        </div>
      `;
      return;
    }

    const resume = resumes[0]; 

    list.innerHTML = `
      <div class="item-card">
        <div class="item-info">
          <h3>Current Resume</h3>
          <p><b>File ID:</b> ${resume.id}</p>
          <p><a href="${API_BASE}/resumes/download/${resume.id}" target="_blank">View Resume</a></p>
        </div>
        <div class="item-actions">
          <button class="btn btn-danger delete-resume-btn" data-id="${resume.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    list.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-circle"></i>
        <h3>Failed to load resume</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// 📄 Delete Resume
async function deleteResume(id) {
  if (!confirm("Are you sure you want to delete this resume?")) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (res.ok) {
      loadResume();
      alert("Resume deleted successfully!");
    } else {
      alert("❌ Failed to delete resume");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  }
}


// =========================================================
// MESSAGES
// =========================================================

// 📩 Fetch Messages
async function loadMessages() {
  const list = document.getElementById("messages-list");
  if (!list) return;
  list.innerHTML = '<div class="spinner"></div>';

  try {
    const res = await fetch(`${API_BASE}/messages`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const messages = await res.json();

    if (!messages || messages.length === 0) {
      list.innerHTML = `
            <div class="empty-state">
              <i class="fas fa-envelope"></i>
              <h3>No Messages Yet</h3>
              <p>You don't have any messages yet</p>
            </div>
          `;
      return;
    }

    list.innerHTML = messages
      .map(
        (m) => `<div class="item-card">
                  <div class="item-info">
                    <h3>${m.name} (${m.email})</h3>
                    <p>${m.message}</p>
                    <small>${new Date(
                      m.createdAt || Date.now()
                    ).toLocaleString()}</small>
                  </div>
                  <div class="item-actions">
                    <button class="btn btn-danger delete-msg-btn" data-id="${m.id}">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`
      )
      .join("");
  } catch (error) {
    list.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Failed to load messages</h3>
            <p>${error.message}</p>
          </div>
        `;
  }
}

// 📩 Delete Message
async function deleteMessage(id) {
  if (!confirm("Are you sure you want to delete this message?")) return;

  try {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.ok) {
      loadMessages();
    } else {
      alert("❌ Failed to delete message");
    }
  } catch (error) {
    alert("❌ Network error: " + error.message);
  }
}

// =========================================================
// PAGE LOAD
// =========================================================

// Event delegation for dynamically added buttons
document.addEventListener('click', (e) => {
    // Delete Project
    if (e.target.closest('.delete-project-btn')) {
        const id = e.target.closest('.delete-project-btn').getAttribute('data-id');
        if (id) deleteProject(id);
    }
    // Edit Project
    if (e.target.closest('.edit-project-btn')) {
        const btn = e.target.closest('.edit-project-btn');
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        const description = btn.getAttribute('data-description');
        const url = btn.getAttribute('data-url');
        if (id) handleEditProject(id, title, description, url);
    }
    // Delete Skill
    if (e.target.closest('.delete-skill-btn')) {
        const id = e.target.closest('.delete-skill-btn').getAttribute('data-id');
        if (id) deleteSkill(id);
    }
    // Edit Skill
    if (e.target.closest('.edit-skill-btn')) {
        const btn = e.target.closest('.edit-skill-btn');
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const level = btn.getAttribute('data-level');
        if (id) handleEditSkill(id, name, level);
    }
    // Delete Certification
    if (e.target.closest('.delete-cert-btn')) {
        const id = e.target.closest('.delete-cert-btn').getAttribute('data-id');
        if (id) deleteCertification(id);
    }
    // Edit Certification
    if (e.target.closest('.edit-cert-btn')) {
        const btn = e.target.closest('.edit-cert-btn');
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const org = btn.getAttribute('data-org');
        const issue = btn.getAttribute('data-issue');
        const expiry = btn.getAttribute('data-expiry');
        const url = btn.getAttribute('data-url');
        if (id) handleEditCertification(id, name, org, issue, expiry, url);
    }
    // Delete Education
    if (e.target.closest('.delete-edu-btn')) {
        const id = e.target.closest('.delete-edu-btn').getAttribute('data-id');
        if (id) deleteEducation(id);
    }
    // Edit Education
    if (e.target.closest('.edit-edu-btn')) {
        const btn = e.target.closest('.edit-edu-btn');
        const id = btn.getAttribute('data-id');
        const institution = btn.getAttribute('data-institution');
        const degree = btn.getAttribute('data-degree');
        const field = btn.getAttribute('data-field');
        const start = btn.getAttribute('data-start');
        const end = btn.getAttribute('data-end');
        const grade = btn.getAttribute('data-grade');
        const description = btn.getAttribute('data-description');
        if (id) handleEditEducation(id, institution, degree, field, start, end, grade, description);
    }
    // Delete Resume
    if (e.target.closest('.delete-resume-btn')) {
        const id = e.target.closest('.delete-resume-btn').getAttribute('data-id');
        if (id) deleteResume(id);
    }
    // Delete Message
    if (e.target.closest('.delete-msg-btn')) {
        const id = e.target.closest('.delete-msg-btn').getAttribute('data-id');
        if (id) deleteMessage(id);
    }
});

// 🚀 Load everything when page opens
window.onload = () => {
  // Check if admin.html is the current page, if not, do nothing
  if (window.location.pathname.includes('admin.html')) {
    loadProjects();
    loadSkills();
    loadCertifications();
    loadEducation();
    loadResume();
    loadMessages();
  } else if (window.location.pathname.includes('login.html')) {
    // If on login page, clear token
    localStorage.removeItem('token');
  } else {
    // For the public-facing portfolio, ensure public data is loaded
    loadProjects();
    loadSkills();
    loadCertifications();
    loadEducation();
    loadResumeButton();
  }
};
