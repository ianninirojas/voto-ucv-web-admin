export const pathRoutes = {
  ELECTORALEVENTS: '/eventos-electorales',
  ELECTORALEVENTSCREATE: '/eventos-electorales/crear',
  ELECTORALEVENTSEDIT: '/eventos-electorales/editar/:id',

  ELECTIONS: '/eventos-electorales/:electoralEventPublickey/elecciones',
  ELECTIONSCREATE: '/eventos-electorales/:electoralEventPublickey/elecciones/crear',
  ELECTIONSEDIT: '/eventos-electorales/:electoralEventPublickey/elecciones/editar/:id',

  FACULTIES: '/facultades',
  FACULTIESCREATE: '/facultades/crear',
  FACULTIESEDIT: '/facultades/editar/:id',

  SCHOOLS: '/facultades/:facultyId/escuelas',
  SCHOOLSCREATE: '/facultades/:facultyId/escuelas/crear',
  SCHOOLSEDIT: '/facultades/:facultyId/escuelas/editar/:id',

  LEVELSELECTION: '/niveles-eleccion',
  LEVELSELECTIONCREATE: '/niveles-eleccion/crear',
  LEVELSELECTIONEDIT: '/niveles-eleccion/editar/:id',

  POSITIONS: '/cargos',
  POSITIONSCREATE: '/cargos/crear',
  POSITIONSEDIT: '/cargos/editar/:id',

  TYPESELECTION: '/tipos-eleccion',
  TYPESELECTIONCREATE: '/tipos-eleccion/crear',
  TYPESELECTIONEDIT: '/tipos-eleccion/editar/:id',

  TYPESELECTOR: '/tupis-elector',
  TYPESELECTORCREATE: '/tupis-elector/crear',
  TYPESELECTOREDIT: '/tupis-elector/editar/:id',

  USERS: '/usuarios',
  USERSCREATE: '/usuarios/crear',
  USERSEDIT: '/usuarios/editar/:id',
}