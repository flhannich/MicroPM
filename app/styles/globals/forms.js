export const border = {
  borderColor: 'rgba(0, 0 ,0, .1)',
  borderWidth: 1,
  borderRadius: 5,
};

export const size = {
  paddingHorizontal: 16,
  paddingVertical: 12,
};

export const color = {
  backgroundColor: '#fff'
};

export const label = {
  // alignSelf: 'center',
}

export const input = {
  ...border,
  ...size,
  ...color,
};

export const inputDark = {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: 'transparent',
  backgroundColor: 'rgba(255, 255, 255, .1)',
  ...size,
};

//
// export const input = {
//   ...base,
//   ...small,
//   ...rounded
// };
