function onSubmit(e) {
  e.preventDefault();
  document.querySelector(".msg").textContent = "";
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  if (prompt === "") {
    alert("Please enter a prompt");
    return;
  }
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
        num_images: 4,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      throw new Error("The image could not be generated");
    }
    const data = await response.json();
    // console.log(data);
    const imageUrls = data.data;
    displayImages(imageUrls);
    // document.querySelector("#image").src = imageUrls;
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function displayImages(imageUrls) {
  const imageContainer = document.querySelector("#image-container");
  if (!imageContainer) return; // Exit early if element is not found
  imageContainer.innerHTML = ""; // Clear previous images
  for (const imageUrl of imageUrls) {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imageContainer.appendChild(imgElement);
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
