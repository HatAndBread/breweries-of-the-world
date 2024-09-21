import { Template } from "dommie";

const NotFound = (h: Template) => {
  const { div, img, h1 } = h;
  return h.component(() => {
    div(
      {
        class:
          "w-full flex justify-center items-center flex-col gap-8 mt-8 min-h-screen",
      },
      () => {
        h1({
          class: "text-2xl font-bold",
          text: "404: Sorry, we couldn't find that page 😿",
        });
        img({ src: "/logo.png", style: { borderRadius: "50%" } });
      },
    );
  });
};
export default NotFound;
