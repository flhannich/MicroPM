
export const badge = {
  borderRadius: 11,
  borderWidth: 1,
  flexDirection: 'row',
  alignSelf: 'flex-start',
  paddingHorizontal: 12,
  paddingVertical: 3,
  overflow: 'hidden',
  textAlign: 'center',
}

export const badgeReview = {
  borderColor: '#007AFF',
  ...badge,
};
export const badgeCompleted = {
  borderColor: '#000',
  ...badge,
};
export const badgeNotStarted = {
  borderColor: '#000',
  ...badge,
};
export const badgeInProgress = {
  borderColor: '#000',
  ...badge,
};

export const primary = {
  backgroundColor: '#007AFF',
  borderRadius: 4,
  paddingHorizontal: 24,
  paddingVertical: 12,
  overflow: 'hidden',
  textAlign: 'center',
};

export const secondary = {
  borderRadius: 4,
  paddingHorizontal: 24,
  paddingVertical: 12,
  overflow: 'hidden',
  // borderWidth: 1,
  // borderColor: '#007AFF',
  textAlign: 'center',
};
