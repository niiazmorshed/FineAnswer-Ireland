import campusPlaza from "../assets/university/campus-plaza.webp";
import graduation from "../assets/university/graduation.webp";
import lectureHall from "../assets/university/lecture-hall.webp";
import libraryStudy from "../assets/university/library-study.webp";
import studentsWalking from "../assets/university/students-walking.webp";
import studySeating from "../assets/university/study-seating.webp";

/**
 * Pictures for scholarship cards.
 *
 * A scholarship record carries an optional `image` URL set from the admin
 * dashboard. Most records will not have one — providers rarely publish a usable
 * image, and nobody wants to hunt for one per listing — so the cards fall back
 * to this bundled set of university photography rather than showing a hole.
 * Campuses and study spaces, not scenery: a funding card should look like it
 * belongs to a course.
 *
 * The fallback is deterministic, not random: the same scholarship keeps the same
 * photo across renders, re-sorts and page loads. A random pick would reshuffle
 * the grid's colours on every visit and make the listing feel unstable.
 */
const FALLBACKS = [
  campusPlaza,
  libraryStudy,
  graduation,
  lectureHall,
  studentsWalking,
  studySeating,
];

/** djb2 — small, stable, and good enough to spread ids across six buckets. */
const hash = (value) => {
  let h = 5381;
  for (let i = 0; i < value.length; i += 1) {
    h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
};

/**
 * @param {{ _id?: string, name?: string, image?: string }} scholarship
 * @returns {string} a URL suitable for an <img src>
 */
export function scholarshipImage(scholarship) {
  const custom = scholarship?.image;
  if (typeof custom === "string" && custom.trim()) return custom.trim();

  const seed = String(scholarship?._id ?? scholarship?.name ?? "");
  return FALLBACKS[seed ? hash(seed) % FALLBACKS.length : 0];
}

export default scholarshipImage;
