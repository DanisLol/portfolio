export type AboutPhoto = {
  src: string;
  alt: string;
};

/**
 * About-page carousel photos. Drop matching files into `public/about/`.
 */
export const aboutPhotos: AboutPhoto[] = [
  { src: "/about/img1.jpg", alt: "About photo 1" },
  { src: "/about/img2.jpg", alt: "About photo 2" },
  { src: "/about/img3.png", alt: "About photo 3" },
  { src: "/about/img4.jpeg", alt: "About photo 4" },
  { src: "/about/img5.jpg", alt: "About photo 5" },
  { src: "/about/img6.jpg", alt: "About photo 6" },
];
