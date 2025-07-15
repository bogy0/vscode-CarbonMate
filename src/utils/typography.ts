export interface CarbonTypeSetToken {
  name: string
  description: string
  group: string
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
}

const carbonTypeSetsRaw = {
  smallStyle: [
    { 
      name: 'code-01', 
      description: 'This is for inline code snippets and smaller code elements.',
      fontSize: '12px / .75rem',
      fontWeight: '400',
      lineHeight: '16px / 1rem',
      letterSpacing: '.32px'
    },
    { 
      name: 'code-02', 
      description: 'This is for large code snippets and larger code elements.',
      fontSize: '14px / .875rem',
      fontWeight: '400',
      lineHeight: '20px / 1.25rem',
      letterSpacing: '.32px'
    },
    { 
      name: 'label-01', 
      description: 'This is a multipurpose type style that can be used for field labels in components, error messages, and captions. It should not be used for body copy.',
      fontSize: '12px / .75rem',
      fontWeight: '400',
      lineHeight: '16px / 1rem',
      letterSpacing: '.32px'
    },
    { 
      name: 'label-02', 
      description: 'This is a multipurpose type style that can be used for field labels in components, error messages, and captions. It should not be used for body copy.',
      fontSize: '14px / .875rem',
      fontWeight: '400',
      lineHeight: '18px / 1.125rem',
      letterSpacing: '.16px'
    },
    { 
      name: 'helper-text-01', 
      description: 'This is for explanatory helper text that appears below a field title within a component.',
      fontSize: '12px / .75rem',
      fontWeight: '400',
      lineHeight: '16px / 1rem',
      letterSpacing: '.32px'
    },
    { 
      name: 'helper-text-02', 
      description: 'This is for explanatory helper text that appears below a field title within a component.',
      fontSize: '14px / .875rem',
      fontWeight: '400',
      lineHeight: '18px / 1.125rem',
      letterSpacing: '.16px'
    },
    { 
      name: 'legal-01', 
      description: 'This is for legal copy appearing in product pages.',
      fontSize: '12px / .75rem',
      fontWeight: '400',
      lineHeight: '16px / 1rem',
      letterSpacing: '.32px'
    },
    { 
      name: 'legal-02', 
      description: 'This is for legal copy appearing in web pages.',
      fontSize: '14px / .875rem',
      fontWeight: '400',
      lineHeight: '18px / 1.125rem',
      letterSpacing: '.16px'
    },
  ],
  body: [
    { 
      name: 'body-compact-01', 
      description: 'This is for short paragraphs with no more than four lines and is commonly used in components.',
      fontSize: '14px / .875rem',
      fontWeight: '400',
      lineHeight: '18px / 1.125rem',
      letterSpacing: '.16px'
    },
    { 
      name: 'body-compact-02', 
      description: 'This is for short paragraphs with no more than four lines. Use in expressive components, such as button and link.',
      fontSize: '16px / 1rem',
      fontWeight: '400',
      lineHeight: '22px / 1.375rem',
      letterSpacing: '0px'
    },
    { 
      name: 'body-01', 
      description: 'With a slightly taller line height than body-compact-01, this body style is used in productive layouts for long paragraphs with more than four lines. Use also for longer body copy in components such as accordion or structured list. It is always left-aligned. Body-long-01 can also be used for productive moments within expressive experiences.',
      fontSize: '14px / .875rem',
      fontWeight: '400',
      lineHeight: '20px / 1.25rem',
      letterSpacing: '.16px'
    },
    { 
      name: 'body-02', 
      description: 'With a slightly taller line height than body-compact-02, this style is commonly used in expressive layouts for long paragraphs with four lines or more. It is always left-aligned.',
      fontSize: '16px / 1rem',
      fontWeight: '400',
      lineHeight: '24px / 1.5rem',
      letterSpacing: '0px'
    },
  ],
  fixedHeadings: [
    { 
      name: 'heading-compact-01', 
      description: 'This is for component and layout headings. It pairs with $body-compact-01.',
      fontSize: '14px / .875rem',
      fontWeight: '600',
      lineHeight: '18px / 1.125rem',
      letterSpacing: '.16px'
    },
    { 
      name: 'heading-compact-02', 
      description: 'This is for smaller layout headings. It pairs with $body-compact-02.',
      fontSize: '16px / 1rem',
      fontWeight: '600',
      lineHeight: '22px / 1.375rem',
      letterSpacing: '0px'
    },
    { 
      name: 'heading-01', 
      description: 'This is for component and layout headings. It pairs with $body-01.',
      fontSize: '14px / .875rem',
      fontWeight: '600',
      lineHeight: '20px / 1.25rem',
      letterSpacing: '.16px'
    },
    { 
      name: 'heading-02', 
      description: 'This is for smaller layout headings. It pairs with $body-02.',
      fontSize: '16px / 1rem',
      fontWeight: '600',
      lineHeight: '24px / 1.5rem',
      letterSpacing: '0px'
    },
    { 
      name: 'heading-03', 
      description: 'This is for component and layout headings.',
      fontSize: '20px / 1.25rem',
      fontWeight: '400',
      lineHeight: '28px / 1.75rem',
      letterSpacing: '0px'
    },
    { 
      name: 'heading-04', 
      description: 'This is for layout headings.',
      fontSize: '28px / 1.75rem',
      fontWeight: '400',
      lineHeight: '36px / 2.25rem',
      letterSpacing: '0px'
    },
    { 
      name: 'heading-05', 
      description: 'This is for layout headings.',
      fontSize: '32px / 2rem',
      fontWeight: '400',
      lineHeight: '40px / 2.5rem',
      letterSpacing: '0px'
    },
    { 
      name: 'heading-06', 
      description: 'This is for layout headings.',
      fontSize: '42px / 2.625rem',
      fontWeight: '300',
      lineHeight: '50px / 3.125rem',
      letterSpacing: '0px'
    },
    { 
      name: 'heading-07', 
      description: 'This is for layout headings.',
      fontSize: '54px / 3.375rem',
      fontWeight: '300',
      lineHeight: '64px / 4rem',
      letterSpacing: '0px'
    },
  ],
  fluidHeadings: [
    { 
      name: 'fluid-heading-03', 
      description: 'This is for component and layout headings.',
      fontSize: '20px / 1.25rem',
      fontWeight: '400',
      lineHeight: '28px / 1.75rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-heading-04', 
      description: 'This is for layout headings.',
      fontSize: '28px / 1.75rem',
      fontWeight: '400',
      lineHeight: '36px / 2.25rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-heading-05', 
      description: 'This is for layout headings.',
      fontSize: '32px / 2rem',
      fontWeight: '400',
      lineHeight: '40px / 2.5rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-heading-06', 
      description: 'This is for layout headings.',
      fontSize: '42px / 2.625rem',
      fontWeight: '300',
      lineHeight: '50px / 3.125rem',
      letterSpacing: '0px'
    },
  ],
  fluidCallouts: [
    { 
      name: 'fluid-paragraph-01', 
      description: 'This is for larger paragraphs of type that are usually three or more lines in length.',
      fontSize: '16px / 1rem',
      fontWeight: '400',
      lineHeight: '24px / 1.5rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-quotation-01', 
      description: '"Quote."',
      fontSize: '20px / 1.25rem',
      fontWeight: '400',
      lineHeight: '28px / 1.75rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-quotation-02', 
      description: '"Quote."',
      fontSize: '28px / 1.75rem',
      fontWeight: '400',
      lineHeight: '36px / 2.25rem',
      letterSpacing: '0px'
    },
  ],
  fluidDisplay: [
    { 
      name: 'fluid-display-01', 
      description: 'Display',
      fontSize: '32px / 2rem',
      fontWeight: '400',
      lineHeight: '40px / 2.5rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-display-02', 
      description: 'Display',
      fontSize: '42px / 2.625rem',
      fontWeight: '300',
      lineHeight: '50px / 3.125rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-display-03', 
      description: 'Display',
      fontSize: '54px / 3.375rem',
      fontWeight: '300',
      lineHeight: '64px / 4rem',
      letterSpacing: '0px'
    },
    { 
      name: 'fluid-display-04', 
      description: 'Display',
      fontSize: '68px / 4.25rem',
      fontWeight: '300',
      lineHeight: '80px / 5rem',
      letterSpacing: '0px'
    },
  ],
};

export function getCarbonTypeSets(): CarbonTypeSetToken[] {
  return Object.entries(carbonTypeSetsRaw).flatMap(([group, tokens]) =>
    tokens.map(token => ({
      name: token.name,
      description: token.description,
      group,
      fontSize: token.fontSize,
      fontWeight: token.fontWeight,
      lineHeight: token.lineHeight,
      letterSpacing: token.letterSpacing
    }))
  );
} 