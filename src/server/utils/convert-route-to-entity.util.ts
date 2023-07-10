const mapping: Record<string, string> = {
  labels: 'label',
  music: 'music',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
