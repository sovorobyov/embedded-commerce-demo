// Type definitions for styleExample object

interface SizeScale {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

interface TapTargetSize {
    sm: string;
    default: string;
    lg: string;
    tiny: string;
    xs: string;
}

interface PointerWidthSize {
    sm: string;
    lg: string;
}

interface IndicatorSize {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

interface FieldSize {
    sm: string;
    lg: string;
}

interface MediaSize {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
}

interface PictogramSize {
    sm: string;
    md: string;
    lg: string;
}

interface SizeProperty {
    icon: SizeScale;
    circle: SizeScale & { xl: string }; // Assuming circle has one extra size
    tapTarget: TapTargetSize;
    pointerWidth: PointerWidthSize;
    indicator: IndicatorSize;
    field: FieldSize;
    media: MediaSize;
    pictogram: PictogramSize;
}

interface SpaceProperty {
    '0': string;
    '25': string;
    '50': string;
    '75': string;
    '100': string;
    '150': string;
    '200': string;
    '250': string;
    '300': string;
    '350': string;
    '400': string;
    '450': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
    '1000': string;
    '1100': string;
    '1200': string;
    tiny: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    jumbo: string;
}

interface ElevationLevel {
    yoffset: string;
    opacity: string;
    blur: string;
}

interface ElevationProperty {
    blurCurve: string;
    blurSlope: string;
    blurBase: string;
    opacity: string;
    brightenFactor: string;
    verticalOffsetRatio: string;
    horizontalOffsetRatio: string;
    level1: ElevationLevel;
    level2: ElevationLevel;
    level3: ElevationLevel;
}

interface MotionTiming {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
}

interface MotionDurationScale {
    small: string;
    medium: string;
    large: string;
}

interface MotionDurationLoop {
    backForth: string;
    standard: string;
}

interface MotionDurationPause {
    read: string;
    reveal: string;
}

interface MotionDurationProperty {
    hover: string;
    action: string;
    arrive: string;
    depart: string;
    repeat: string;
    linger: string;
    enter: MotionDurationScale;
    exit: MotionDurationScale;
    move: MotionDurationScale;
    loop: MotionDurationLoop;
    pause: MotionDurationPause;
}

interface MotionEasingScale {
    small: string;
    medium: string;
    large: string;
}

interface MotionEasingLoop {
    backForth: string;
    standard: string;
}

interface MotionEasingProperty {
    enter: MotionEasingScale;
    exit: MotionEasingScale;
    move: MotionEasingScale;
    loop: MotionEasingLoop;
}

interface MotionProperty {
    timing: MotionTiming;
    duration: MotionDurationProperty;
    easing: MotionEasingProperty;
}

interface BorderThickness {
    normal: string;
    emphasis: string;
    focus: string;
    focusOutline: string;
}

interface BorderRadius {
    tiny: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    jumbo: string;
    interactive: string;
}

interface BorderProperty {
    thickness: BorderThickness;
    radius: BorderRadius;
}

interface TypographyStyle {
    family: string;
    size: string;
    sizeInPx: string;
    weight: string;
    lineHeight: string;
    lineHeightInPx: string;
    letterSpacing: string;
    maxScaleFactor: string;
    underline?: string; // Optional for links
}

interface TypographyProperty {
    displayStrong: TypographyStyle;
    displayMedium: TypographyStyle;
    display: TypographyStyle;
    displaySmStrong: TypographyStyle;
    displaySmMedium: TypographyStyle;
    displaySm: TypographyStyle;
    headingLgStrong: TypographyStyle;
    headingLgMedium: TypographyStyle;
    headingLg: TypographyStyle;
    headingSmStrong: TypographyStyle;
    headingSmMedium: TypographyStyle;
    headingSm: TypographyStyle;
    titleStrong: TypographyStyle;
    titleMedium: TypographyStyle;
    title: TypographyStyle;
    bodyStrong: TypographyStyle;
    bodyMedium: TypographyStyle;
    body: TypographyStyle;
    captionStrong: TypographyStyle;
    captionMedium: TypographyStyle;
    caption: TypographyStyle;
    linkLg: TypographyStyle;
    linkSm: TypographyStyle;
    tagStrong: TypographyStyle;
    tagMedium: TypographyStyle;
    tag: TypographyStyle;
    dataVizStrong: TypographyStyle;
    dataVizMedium: TypographyStyle;
    dataViz: TypographyStyle;
    buttonXl: TypographyStyle;
    buttonLg: TypographyStyle;
    buttonSm: TypographyStyle;
    fieldLabelLg: TypographyStyle;
    fieldLabelSm: TypographyStyle;
    fieldPrefixCurrency2Xl: TypographyStyle;
    fieldPrefixCurrencyXl: TypographyStyle;
    fieldPrefixCurrencyLg: TypographyStyle;
    fieldPrefixCurrencyMd: TypographyStyle;
    fieldPrefixCurrencySm: TypographyStyle;
    fieldValueCurrency2Xl: TypographyStyle;
    fieldValueCurrencyXl: TypographyStyle;
    fieldValueCurrencyLg: TypographyStyle;
    fieldValueCurrencyMd: TypographyStyle;
    fieldValueCurrencySm: TypographyStyle;
    fieldValueXl: TypographyStyle;
    fieldValueLg: TypographyStyle;
    fieldValueSm: TypographyStyle;
    navigationBarStrong: TypographyStyle;
    navigationBarMedium: TypographyStyle;
    navigationBar: TypographyStyle;
    legalStrong: TypographyStyle;
    legalMedium: TypographyStyle;
    legal: TypographyStyle;
}

interface BlurProperty {
    interactive: string;
}

interface ColorState {
    main: string;
    mainHover: string;
    mainActive: string;
    contrast: string;
    contrastHover?: string; // Optional
    contrastActive?: string; // Optional
    alt?: string;          // Optional
    altHover?: string;     // Optional
    altActive?: string;    // Optional
}

interface ColorStateMedium extends Omit<ColorState, 'contrastHover' | 'contrastActive' | 'alt' | 'altHover' | 'altActive'> { }
interface ColorStateLight extends ColorStateMedium { }
interface ColorStateModerate extends ColorStateMedium { }
interface ColorStateSoft extends ColorStateMedium { }

interface ColorBackground {
    main: string;
    alt: string;
    surface: string;
    surfaceHover: string;
    surfaceActive: string;
    highContrast: string;
    mediumContrast: string;
}

interface ColorPrimary extends ColorState {
    medium: ColorStateMedium;
}

interface ColorSecondary extends ColorState {
    medium: ColorStateMedium;
}

interface ColorTertiary extends ColorState { }
interface ColorFeatured extends ColorState { }

interface ColorPromotion extends ColorState {
    medium: ColorStateMedium;
    light: ColorStateLight;
    moderate: ColorStateModerate;
    soft: ColorStateSoft;
}

interface ColorUnselected extends Omit<ColorState, 'contrastHover' | 'contrastActive' | 'alt' | 'altHover' | 'altActive'> { }
interface ColorSelected extends ColorState { }
interface ColorSelectedRange extends ColorState { }

interface ColorLink extends ColorState { }

interface ColorOverlay extends Omit<ColorState, 'contrastHover' | 'contrastActive' | 'alt' | 'altHover' | 'altActive'> { }

interface ColorOverlayInverse extends ColorState {
    light: ColorStateLight;
}

interface ColorAccent {
    main: string;
    contrast: string;
}

interface ColorStatus extends ColorState {
    medium: ColorStateMedium;
}

interface ColorWarning extends ColorState {
    alt: string; // Warning has an extra alt
    medium: ColorStateMedium;
}

interface ColorSystem extends ColorState { }
interface ColorInfo extends ColorState { }

interface ColorSpecialty extends ColorState {
    medium: ColorStateMedium;
}

interface ColorDataViz {
    empty: string;
    value1: string;
    value2: string;
}

interface ColorStructure {
    borderHighContrast: string;
    borderLowContrast: string;
    divider: string;
    focus: string;
    scrim: string;
    shimmer: string;
    shimmerInverse: string;
    sheen: string;
    shadow: string;
    focusOutline: string;
    errorOutline: string;
}

interface ColorProperty {
    background: ColorBackground;
    primary: ColorPrimary;
    secondary: ColorSecondary;
    tertiary: ColorTertiary;
    featured: ColorFeatured;
    promotion: ColorPromotion;
    unselected: ColorUnselected;
    selected: ColorSelected;
    selectedRange: ColorSelectedRange;
    link: ColorLink;
    overlay: ColorOverlay;
    overlayInverse: ColorOverlayInverse;
    accent1: ColorAccent;
    accent2: ColorAccent;
    accent3: ColorAccent;
    accent4: ColorAccent;
    error: ColorStatus;
    warning: ColorWarning;
    success: ColorStatus;
    system: ColorSystem;
    info: ColorInfo;
    specialty: ColorSpecialty;
    dataViz: ColorDataViz;
    structure: ColorStructure;
}

// Main exported type
export interface OnboardingSDKStyle {
    size: SizeProperty;
    space: SpaceProperty;
    elevation: ElevationProperty;
    motion: MotionProperty;
    border: BorderProperty;
    typography: TypographyProperty;
    blur: BlurProperty;
    color: ColorProperty;
} 