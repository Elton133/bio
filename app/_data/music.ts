export type TimedLyric = {
  /** Seconds from the beginning of the track. Decimals are supported. */
  at: number;
  text: string;
};

export type Soundtrack = {
  src: string;
  title: string;
  artist: string;
  lyrics: TimedLyric[];
};

/**
 * MUSIC SETUP
 * 1. Put the final audio file in public/audio (for example: public/audio/portfolio-theme.mp3).
 * 2. Set `src` to its public URL (for example: "/audio/portfolio-theme.mp3").
 * 3. Add the lyrics in playback order. `at` is the line's start time in seconds.
 *
 * Example lyric entry: { at: 12.4, text: "Your first lyric line" }
 * Keep `src` empty until the real file is added; the site will show a quiet coming-soon state.
 */
export const soundtrack: Soundtrack = {
  src: "/Booshle G. - MIRACLE (Official Video) (1).mp3",
  title: "Miracle",
  artist: "Booshle G.",
  lyrics: [
    { at: 10.8, text: "Hi" },
    { at: 13.4, text: "How could I keep my mind" },
    { at: 16.7, text: "Looking in your eyes" },
    { at: 20.1, text: "They say when stars align" },
    { at: 23.5, text: "The universe cannot deny" },
    { at: 27.2, text: "We got love in the air tonight" },
    { at: 31.4, text: "I’d rather die this time" },
    { at: 34.7, text: "Than lose this moment" },
    { at: 38.1, text: "It feels like forever since I rolled the dice" },
    { at: 42.5, text: "I don’t care if I lose" },
    { at: 45.6, text: "Just as long as I don’t lose you" },
    { at: 49.6, text: "I know what I have to do" },
    { at: 53.4, text: "’Cos at the end of the road" },
    { at: 56.6, text: "As it all unfolds" },
    { at: 59.5, text: "We kinda look like a miracle" },
    { at: 64.0, text: "Oh my love, can you see what’s next?" },
    { at: 68.1, text: "’Cos I can’t hide what I’m feeling" },
    { at: 72.5, text: "Oh my soul can’t let go" },
    { at: 76.4, text: "I tried so hard not lose myself" },
    { at: 80.5, text: "And all I found was a feeling" },
    { at: 84.5, text: "Now my soul can’t let go" },
    { at: 90.0, text: "Okay, alright" },
    { at: 93.0, text: "I’ll take a leap of faith" },
    { at: 96.5, text: "’Cos I’ve been waiting for my whole life" },
    { at: 101.1, text: "My heart is coming alive" },
    { at: 106.0, text: "’Cos at the end of the road" },
    { at: 109.1, text: "As it all unfolds" },
    { at: 112.0, text: "You kinda look like a miracle" },
    { at: 116.5, text: "Oh my love, can you see what’s next?" },
    { at: 120.6, text: "’Cos I can’t hide what I’m feeling" },
    { at: 125.0, text: "Oh my soul can’t let go" },
    { at: 128.9, text: "I tried so hard not lose myself" },
    { at: 133.0, text: "And all I found was a feeling" },
    { at: 137.0, text: "Now my soul can’t let go" },
    { at: 142.5, text: "What does your heart keep saying?" },
    { at: 146.0, text: "I know it might sound crazy" },
    { at: 149.5, text: "But get lost in it, let’s get lost in it" },
    { at: 153.8, text: "Show me what real love looks like" },
    { at: 158.0, text: "I wanna live my whole life tonight" },
    { at: 162.2, text: "I wanna see it tonight" },
    { at: 167.0, text: "Oh my love, can you see what’s next?" },
    { at: 171.1, text: "’Cos I can’t hide what I’m feeling" },
    { at: 175.5, text: "Oh my soul can’t let go" },
    { at: 179.4, text: "I tried so hard not lose myself" },
    { at: 183.5, text: "And all I found was a feeling" },
    { at: 188.0, text: "Now my soul can’t let go" },
  ],
};
