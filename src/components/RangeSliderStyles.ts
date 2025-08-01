export const commonClasses = {
  base: 'base size-full relative z-1',
  origin: 'origin absolute top-0 end-0 size-full origin-[0_0] rounded-full',
  connects: 'connects relative z-0 size-full rounded-full overflow-hidden',
  ltr: 'ltr',
  rtl: 'rtl',
  textDirectionLtr: 'txt-dir-ltr text-left',
  textDirectionRtl: 'txt-dir-rtl text-right',
  draggable: 'draggable cursor-grab',
  drag: 'state-drag cursor-grabbing',
  tap: 'state-tap cursor-pointer',
  active: 'active cursor-grabbing',
  pips: 'pips text-xs text-gray-500',
  pipsHorizontal: 'pips-horizontal text-xs text-gray-500',
  pipsVertical: 'pips-vertical text-xs text-gray-500',
  marker: 'marker bg-gray-300',
  markerHorizontal: 'marker-horizontal bg-gray-300',
  markerVertical: 'marker-vertical bg-gray-300',
  markerNormal: 'marker-normal bg-gray-300',
  markerLarge: 'marker-large bg-gray-400',
  markerSub: 'marker-sub bg-gray-200',
  value: 'value text-xs text-gray-500',
  valueHorizontal: 'value-horizontal text-xs text-gray-500',
  valueVertical: 'value-vertical text-xs text-gray-500',
  valueNormal: 'value-normal text-xs text-gray-500',
  valueLarge: 'value-large text-sm text-gray-600',
  valueSub: 'value-sub text-xs text-gray-400',
}

const baseHorizontalHandleStyles =
  'absolute top-1/2 end-0 rounded-full cursor-pointer translate-x-2/4 -translate-y-2/4'

const baseVerticalHandleStyles =
  'absolute start-1/2 rounded-full cursor-pointer -translate-x-2/4 -translate-y-2/4'

const baseConnectStyles = 'absolute top-0 end-0 z-1 size-full origin-[0_0]'
const baseTooltipStyles =
  'tooltip absolute bottom-full start-2/4 -translate-x-2/4 text-sm font-medium'

const minimalHorizontalHandleStyles = `${baseHorizontalHandleStyles} size-4 bg-white border border-gray-600 hover:border-gray-700 transition-colors`
const minimalVerticalHandleStyles = `${baseVerticalHandleStyles} size-4 bg-white border border-gray-600 hover:border-gray-700 transition-colors`
const minimalTargetStyles = 'target relative h-1.5 rounded-full bg-gray-200'
const minimalVerticalTargetStyles = 'target relative w-1.5 rounded-full bg-gray-200'
const minimalConnectStyles = `${baseConnectStyles} bg-indigo-500`

const fancyHorizontalHandleStyles = `${baseHorizontalHandleStyles} size-6 bg-gradient-to-br from-white to-gray-100 border-2 border-indigo-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200`
const fancyVerticalHandleStyles = `${baseVerticalHandleStyles} size-6 bg-gradient-to-br from-white to-gray-100 border-2 border-indigo-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200`
const fancyTargetStyles =
  'target relative h-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner'
const fancyVerticalTargetStyles =
  'target relative w-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner'
const fancyConnectStyles = `${baseConnectStyles} bg-gradient-to-r from-indigo-500 to-purple-600 shadow-sm`
const fancyTooltipStyles = `${baseTooltipStyles} bg-gradient-to-br from-white to-gray-50 border border-gray-200 text-gray-800 py-2 px-3 rounded-lg mb-4 shadow-lg backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200`

export const minimalClasses = {
  target: minimalTargetStyles,
  handle: `handle ${minimalHorizontalHandleStyles}`,
  handleLower: `handle-lower ${minimalHorizontalHandleStyles}`,
  handleUpper: `handle-upper ${minimalHorizontalHandleStyles}`,
  touchArea: 'touch-area absolute -inset-1',
  horizontal: 'horizontal h-1.5',
  vertical: 'vertical w-1.5',
  background: 'background bg-gray-200',
  connect: `connect ${minimalConnectStyles}`,
  tooltip: 'tooltip hidden',
}

export const fancyClasses = {
  target: fancyTargetStyles,
  handle: `handle ${fancyHorizontalHandleStyles}`,
  handleLower: `handle-lower ${fancyHorizontalHandleStyles}`,
  handleUpper: `handle-upper ${fancyHorizontalHandleStyles}`,
  touchArea: 'touch-area absolute -inset-2',
  horizontal: 'horizontal h-3',
  vertical: 'vertical w-3',
  background: 'background bg-gradient-to-r from-gray-200 to-gray-300',
  connect: `connect ${fancyConnectStyles}`,
  tooltip: fancyTooltipStyles,
}

export const minimalVerticalClasses = {
  target: minimalVerticalTargetStyles,
  handle: `handle ${minimalVerticalHandleStyles}`,
  handleLower: `handle-lower ${minimalVerticalHandleStyles}`,
  handleUpper: `handle-upper ${minimalVerticalHandleStyles}`,
  touchArea: 'touch-area absolute -inset-1',
  horizontal: 'horizontal h-1.5',
  vertical: 'vertical w-1.5',
  background: 'background bg-gray-200',
  connect: `connect ${minimalConnectStyles}`,
  tooltip: 'tooltip hidden',
}

export const fancyVerticalClasses = {
  target: fancyVerticalTargetStyles,
  handle: `handle ${fancyVerticalHandleStyles}`,
  handleLower: `handle-lower ${fancyVerticalHandleStyles}`,
  handleUpper: `handle-upper ${fancyVerticalHandleStyles}`,
  touchArea: 'touch-area absolute -inset-2',
  horizontal: 'horizontal h-3',
  vertical: 'vertical w-3',
  background: 'background bg-gradient-to-r from-gray-200 to-gray-300',
  connect: `connect ${fancyConnectStyles}`,
  tooltip: fancyTooltipStyles,
}
