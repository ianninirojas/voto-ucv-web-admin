import React, { Component } from 'react';

import { Switch } from 'react-router-dom';

import {
  Home,
  ElectoralEvents,
  ElectoralEventCreate,
  ElectoralEventEdit,
  Elections,
  ElectionCreate,
  ElectionEdit,
  Faculties,
  FacultyCreate,
  FacultyEdit,
  Positions,
  PositionCreate,
  PositionEdit,
  Schools,
  SchoolCreate,
  SchoolEdit,
  TypeElectionCreate,
  TypeElectionEdit,
  TypeElections,
  Users,
  UserCreate,
  UserEdit,
} from "../@pages";

import { AuthorizationRouter } from "../@components";

import { pathRoutes } from "../@constans";

import { Role } from "../@helpers";

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: pathRoutes.ELECTORALEVENTS,
    component: ElectoralEvents,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.ELECTORALEVENTSCREATE,
    component: ElectoralEventCreate,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.ELECTORALEVENTSEDIT,
    component: ElectoralEventEdit,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.ELECTIONS,
    component: Elections,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.ELECTIONSCREATE,
    component: ElectionCreate,
    roles: [Role.Admin],
    exact: true
  },
  // {
  //   path: pathRoutes.ELECTIONSEDIT,
  //   component: ElectionEdit,
  //   roles: [Role.Admin]
  // },
  {
    path: pathRoutes.FACULTIES,
    component: Faculties,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.FACULTIESCREATE,
    component: FacultyCreate,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.FACULTIESEDIT,
    component: FacultyEdit,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.SCHOOLS,
    component: Schools,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.SCHOOLSCREATE,
    component: SchoolCreate,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.SCHOOLSEDIT,
    component: SchoolEdit,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.POSITIONS,
    component: Positions,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.POSITIONSCREATE,
    component: PositionCreate,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.POSITIONSEDIT,
    component: PositionEdit,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.TYPESELECTION,
    component: TypeElections,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.TYPESELECTIONCREATE,
    component: TypeElectionCreate,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.TYPESELECTIONEDIT,
    component: TypeElectionEdit,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.USERS,
    component: Users,
    roles: [Role.Admin],
    exact: true,
  },
  {
    path: pathRoutes.USERSCREATE,
    component: UserCreate,
    roles: [Role.Admin],
    exact: true
  },
  {
    path: pathRoutes.USERSEDIT,
    component: UserEdit,
    roles: [Role.Admin],
    exact: true
  }
]

const Routing = () => {
  return routes.map((route, index) => <AuthorizationRouter key={index} exact={route.exact} path={route.path} component={route.component} roles={route.roles} />)
}

export const PrivatesRoutes = () => {
  return (
    <Switch>
      <Routing />
    </Switch>
  )
}