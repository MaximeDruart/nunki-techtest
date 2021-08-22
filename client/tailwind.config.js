module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      background: "#1B1B26",
      textStandard: "#E2E2E2",
      textDisabled: "#BEBEBE",
      primary1: "#7D63FF",
      primary2: "#6647FF",
      primary3: "#441FFF",
      primary4: "#2900F5",
      primary5: "#AA99FF",
      primary6: "#CCC2FF",
      primary7: "#EEEBFF",
      secondary1: "#2A2A3C",
      secondary2: "#3B3B54",
      secondary3: "#191924",
      secondary4: "#08080C",
      secondary5: "#B8B8C0",
      secondary6: "#5D5D83",
      secondary7: "#707099",
      neutral1: "#CCCCCC",
      neutral2: "#FFFFFF",
      neutral3: "#EBEBEB",
      neutral4: "#E0E0E0",
      negative1: "#F5704F",
      success1: "#58BF7E",
      warning1: "#FFCC26",
    },
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
}
