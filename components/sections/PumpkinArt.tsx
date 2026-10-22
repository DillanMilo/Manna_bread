export const LEAF_COLORS = ['#D9822B', '#E3A548', '#B5562B', '#C9A84C'];

export function Leaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2L18.6 8.4L24 6.2L22.6 11.8L29 12.4L24.6 16.6L28 21L21.6 20.4L20.4 26L16 22.2L11.6 26L10.4 20.4L4 21L7.4 16.6L3 12.4L9.4 11.8L8 6.2L13.4 8.4Z"
        fill={color}
        fillOpacity=".9"
      />
      <path d="M16 8V30M16 17L11 12.5M16 17L21 12.5M16 21L10.5 19M16 21L21.5 19" stroke="#3E2723" strokeOpacity=".35" strokeWidth=".9" strokeLinecap="round" />
    </svg>
  );
}

export function SmallPumpkin() {
  return (
    <svg viewBox="0 0 48 42" fill="none">
      <path d="M24 11C24 7 25.5 4.5 28.5 3" stroke="#7A8F5E" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="14.5" cy="26" rx="11" ry="13" fill="#B85F24" />
      <ellipse cx="33.5" cy="26" rx="11" ry="13" fill="#B85F24" />
      <ellipse cx="24" cy="26" rx="11" ry="14.5" fill="#D9822B" />
      <path d="M24 13C21 19 21 33 24 40M24 13C27 19 27 33 24 40" stroke="#8E4518" strokeOpacity=".55" strokeWidth="1" />
      <ellipse cx="20" cy="20" rx="3" ry="5" fill="#F2B866" fillOpacity=".35" />
    </svg>
  );
}
