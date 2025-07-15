export interface CarbonColorToken {
  name: string
  description: string
  group: string
  hex: string
  rgb: string
  usage: string
}

const carbonColorTokensRaw = {
  interactive: [
    {
      name: 'interactive-01',
      description: 'Primary interactive color',
      hex: '#0f62fe',
      rgb: '15, 98, 254',
      usage: 'Primary buttons, links, and interactive elements'
    },
    {
      name: 'interactive-02',
      description: 'Secondary interactive color',
      hex: '#393939',
      rgb: '57, 57, 57',
      usage: 'Secondary buttons and interactive elements'
    },
    {
      name: 'interactive-03',
      description: 'Tertiary interactive color',
      hex: '#0f62fe',
      rgb: '15, 98, 254',
      usage: 'Tertiary buttons and subtle interactive elements'
    },
    {
      name: 'interactive-04',
      description: 'Quaternary interactive color',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      usage: 'Quaternary buttons and minimal interactive elements'
    }
  ],
  ui: [
    {
      name: 'ui-01',
      description: 'Primary UI background',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      usage: 'Main page backgrounds and card surfaces'
    },
    {
      name: 'ui-02',
      description: 'Secondary UI background',
      hex: '#f4f4f4',
      rgb: '244, 244, 244',
      usage: 'Secondary backgrounds and subtle surfaces'
    },
    {
      name: 'ui-03',
      description: 'Tertiary UI background',
      hex: '#e0e0e0',
      rgb: '224, 224, 224',
      usage: 'Tertiary backgrounds and borders'
    },
    {
      name: 'ui-04',
      description: 'Quaternary UI background',
      hex: '#8d8d8d',
      rgb: '141, 141, 141',
      usage: 'Quaternary backgrounds and strong borders'
    },
    {
      name: 'ui-05',
      description: 'Quinary UI background',
      hex: '#161616',
      rgb: '22, 22, 22',
      usage: 'Dark backgrounds and high contrast surfaces'
    }
  ],
  text: [
    {
      name: 'text-01',
      description: 'Primary text color',
      hex: '#161616',
      rgb: '22, 22, 22',
      usage: 'Primary text and headings'
    },
    {
      name: 'text-02',
      description: 'Secondary text color',
      hex: '#525252',
      rgb: '82, 82, 82',
      usage: 'Secondary text and labels'
    },
    {
      name: 'text-03',
      description: 'Placeholder text color',
      hex: '#a8a8a8',
      rgb: '168, 168, 168',
      usage: 'Placeholder text and disabled content'
    },
    {
      name: 'text-04',
      description: 'Inverse text color',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      usage: 'Text on dark backgrounds'
    },
    {
      name: 'text-05',
      description: 'Inverse secondary text color',
      hex: '#e0e0e0',
      rgb: '224, 224, 224',
      usage: 'Secondary text on dark backgrounds'
    }
  ],
  icon: [
    {
      name: 'icon-01',
      description: 'Primary icon color',
      hex: '#161616',
      rgb: '22, 22, 22',
      usage: 'Primary icons and symbols'
    },
    {
      name: 'icon-02',
      description: 'Secondary icon color',
      hex: '#525252',
      rgb: '82, 82, 82',
      usage: 'Secondary icons and symbols'
    },
    {
      name: 'icon-03',
      description: 'Inverse icon color',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      usage: 'Icons on dark backgrounds'
    }
  ],
  field: [
    {
      name: 'field-01',
      description: 'Primary field background',
      hex: '#f4f4f4',
      rgb: '244, 244, 244',
      usage: 'Input field backgrounds'
    },
    {
      name: 'field-02',
      description: 'Secondary field background',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      usage: 'Secondary input field backgrounds'
    }
  ],
  inverse: [
    {
      name: 'inverse-01',
      description: 'Inverse primary color',
      hex: '#ffffff',
      rgb: '255, 255, 255',
      usage: 'Primary elements on dark backgrounds'
    },
    {
      name: 'inverse-02',
      description: 'Inverse secondary color',
      hex: '#393939',
      rgb: '57, 57, 57',
      usage: 'Secondary elements on dark backgrounds'
    }
  ],
  support: [
    {
      name: 'support-01',
      description: 'Error color',
      hex: '#da1e28',
      rgb: '218, 30, 40',
      usage: 'Error states and destructive actions'
    },
    {
      name: 'support-02',
      description: 'Success color',
      hex: '#24a148',
      rgb: '36, 161, 72',
      usage: 'Success states and positive feedback'
    },
    {
      name: 'support-03',
      description: 'Warning color',
      hex: '#f1c21b',
      rgb: '241, 194, 27',
      usage: 'Warning states and caution messages'
    },
    {
      name: 'support-04',
      description: 'Info color',
      hex: '#0043ce',
      rgb: '0, 67, 206',
      usage: 'Information states and neutral feedback'
    }
  ],
  overlay: [
    {
      name: 'overlay-01',
      description: 'Overlay color',
      hex: 'rgba(22, 22, 22, 0.5)',
      rgb: '22, 22, 22, 0.5',
      usage: 'Modal overlays and backdrop elements'
    }
  ]
};

export function getCarbonColorTokens(): CarbonColorToken[] {
  return Object.entries(carbonColorTokensRaw).flatMap(([group, tokens]) =>
    tokens.map(token => ({
      name: token.name,
      description: token.description,
      group,
      hex: token.hex,
      rgb: token.rgb,
      usage: token.usage
    }))
  );
} 