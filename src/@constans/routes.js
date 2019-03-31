export const pathRoutes = {
  ELECTORALEVENTS: '/electoral-events',
  ELECTORALEVENTSCREATE: '/electoral-events/create',
  ELECTORALEVENTSEDIT: '/electoral-events/edit/:id',

  ELECTIONS: '/electoral-events/:electoralEventPublickey/elections',
  ELECTIONSCREATE: '/electoral-events/:electoralEventPublickey/elections/create',
  ELECTIONSEDIT: '/electoral-events/:electoralEventPublickey/elections/edit/:id',

  FACULTIES: '/faculties',
  FACULTIESCREATE: '/faculties/create',
  FACULTIESEDIT: '/faculties/edit/:id',

  SCHOOLS: '/faculties/:facultyId/schools',
  SCHOOLSCREATE: '/faculties/:facultyId/schools/create',
  SCHOOLSEDIT: '/faculties/:facultyId/schools/edit/:id',

  LEVELSELECTION: '/levels-lection',
  LEVELSELECTIONCREATE: '/levels-lection/create',
  LEVELSELECTIONEDIT: '/levels-election/edit/:id',

  POSITIONS: '/positions',
  POSITIONSCREATE: '/positions/create',
  POSITIONSEDIT: '/positions/edit/:id',

  TYPESELECTION: '/types-election',
  TYPESELECTIONCREATE: '/types-election/create',
  TYPESELECTIONEDIT: '/types-election/edit/:id',

  TYPESELECTOR: '/types-elector',
  TYPESELECTORCREATE: '/types-elector/create',
  TYPESELECTOREDIT: '/types-elector/edit/:id',

  USERS: '/users',
  USERSCREATE: '/users/create',
  USERSEDIT: '/users/edit/:id',
}