// theme.ts
// export interface Theme {
//     colors: {
//       primary: string;
//       secondary: string;
//       background: string;
//       text: string;
//     };
//     text: {}
//     spacing: (factor: number) => number;
//     // Add other theme properties as needed
//   }
  
  export const theme = {
    colors: {
      primary: 'white',
      secondary: '#03DAC6',
      background: '#FFFFFF',
      text: '#000000',
    },
    font: {
        size: {
            subtext: 12,
            small: 16,
            medium: 20,
            large: 30
        },
        family: {

        },
    },
    spacing: (factor: number) => factor * 8,
  };

  export const components = {
    text: {
        paragraph: {
            color: theme.colors.primary,
            fontSize: theme.font.size.small 
        },
        header: {
            color: theme.colors.primary,
            fontSize: theme.font.size.large,
            // textAlign: 'center',
        },
        subheader: {
            color: theme.colors.primary,
            fontSize: theme.font.size.medium,
            // textAlign: 'center',
        }
    },
  };
  