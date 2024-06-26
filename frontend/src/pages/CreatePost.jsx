import { useState } from "react";
import previewImg from "../assets/preview.png";
import { surpriseMePrompts } from "../constants";

import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [photo, setPhoto] = useState(null);
  const handleSurpriseMe = () => {
    const prompt =
      surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];
    setPrompt(prompt);
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateImage = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    const form = e.target;
    const name = form.name.value;

    try {
      const res = await fetch("http://localhost:5000/api/dalle/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          name,
        }),
      });
      const data = await res.json();
      if (data) {
        setPhoto(data.photo);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleGenerateImage}>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="John doe"
            className="py-2 rounded-md bg-transparent outline-none border pl-3"
            required
          />
          <label htmlFor="name" className="mt-5">
            Prompt{" "}
            <span>
              <button
                type="button"
                className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black ml-1"
                onClick={handleSurpriseMe}
              >
                Surprise me
              </button>
            </span>
          </label>
          <input
            type="text"
            name="prompt"
            onChange={handleChange}
            value={prompt}
            className="py-2 rounded-md bg-transparent outline-none border pl-3"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            required
          />
        </div>

        <div className="border w-80 rounded-xl overflow-hidden mt-10">
          {!photo ? (
            <img src={previewImg} alt="" width={300} />
          ) : photo ? (
            <img
              src={photo}
              alt=""
              width={500}
              height={500}
              className="w-full object-cover"
            />
          ) : (
            loading && <Loader />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-8"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      <p className="mt-10">
        ** Once you have created the image you want, you can share it with
        others in the community **
      </p>
      <Link to={"/"}>
        <button
          
          className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Share with the Community
        </button>
      </Link>
    </section>
  );
};

export default CreatePost;
