// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FAEBD7", // all widgets color and navbar - Lmode
    10: "#FFFFF0", // background color - Lmode
    50: "#F0F0F0", // input field color, post and search and logout -Lmode

    100: "#E0E0E0", // primary text on promoted, profile  and chum list - Dmode
    200: "#C2C2C2", // primary text on social, myPosts, friend list and post content -Dmode
    300: "#A3A3A3", // my posts texts -Dmode
    400: "#858585", //secondary text on social, myPosts, friend list and featured content & profile -Dmode
    
    500: "#666666", // primary texts on friends list, posts, post content, profile * pfp icons,  - Lmode
    600: "#4D4D4D",
    700: "#333333", // primary text on promoted, profile, chum list header and sun icons -Lmode
    // and also for Dmode - input field colot, logout and post and search -Dmode

    800: "#1e293b", // all widget color and navbar -Dmode
    900: "#0f172a", // the BG color -Dmode
    1000: "#000000",
  },
  primary: {
    // 50: "#8E44AD", // icon border color -Lmode
    50: "#E6FBFF",
    100: "#CCF7FE",
    // 200: "#8E44AD", // Icon itself color -Dmode
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    // 500: "#007BFF", //-> POST button, like color &  login  -Dmode
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D", //Icon Color itself -Lmode
    // 800: "#FFEB3B", // -> the icon border color  -Dmode
    800: "#00353F", 
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: { //set the default color for material UI theme, so it is easy to configure what we need
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
