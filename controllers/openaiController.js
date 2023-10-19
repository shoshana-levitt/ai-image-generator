const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  const { prompt, size, num_images } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const imageUrls = [];
    for (let i = 0; i < num_images; i++) {
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: imageSize,
      });
      const imageUrl = response.data[0].url;
      imageUrls.push(imageUrl);
    }
    res.status(200).json({
      success: true,
      data: imageUrls,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "The images could not be generated",
    });
  }
};

module.exports = { generateImage };
