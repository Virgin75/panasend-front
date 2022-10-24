// 1. Import `createTheme`
import { createTheme, NextUIProvider, Text } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom values
export const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "#2B4391",
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#2B4391',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd',
      cta: "#FBBC04",

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

export const colors = {
  // brand colors
  primaryLight: "#2B4391",
  primaryLightHover: '$green300',
  primaryLightActive: '$green400',
  primaryLightContrast: '$green600',
  primary: '#4ADE7B',
  primaryBorder: '$green500',
  primaryBorderHover: '$green600',
  primarySolidHover: '$green700',
  primarySolidContrast: '$white',
  primaryShadow: '$green500',

  gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
  link: '#5E1DAD',

  // you can also create your own color
  myColor: '#ff4ecd',
  cta: "#FBBC04",
  cta2: "rgba(255, 223, 125, 0.25)"

  // ...  more colors
}
