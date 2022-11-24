import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

const exampleEpisodeData = {
    airdate: "2016-07-15",
    airstamp: "2016-07-15T12:00:00+00:00",
    airtime: "",
    id: 553946,
    image: "",
    name: "Chapter One: The Vanishing of Will Byers",
    number: 1,
    rating: { average: 8.2 },
    runtime: 49,
    season: 1,
    summary:
      "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
    type: "regular",
    url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
  };

test("renders without error", () => {
    render(<Episode episode={exampleEpisodeData}/>)
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={exampleEpisodeData} />);
    const summary = screen.queryByText(/Chapter One/i);
    console.log(summary)
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent("Chapter One");
    expect(summary).toBeInTheDocument();

});

test("renders default image when image is not defined", () => {
    render(<Episode episode={exampleEpisodeData} />);
    const img = screen.queryByAltText("https://i.ibb.co/2FsfXqM/stranger-things.png")
    expect(img).toBeInTheDocument();
});

// ----- EXAMPLE EPISODE TEST OBJECT -----
