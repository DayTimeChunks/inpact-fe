
export interface IAppState {
  loggedIn: boolean;
  user: IProfileProps | object;
}
export interface IAppProps {}

export interface ISignupProps {
  userAuthorized: (userJsonObject: object) => void;
}
export interface ISignupState {
  inputError: string;
  passwordError: string;
  google: boolean;
}

export interface ILoginProps {
  userAuthorized: (userJsonObject: object) => void;
}

export interface ILoginState {
  inputError: string;
  google: boolean;
}

export interface INavProps {
  loggedIn: boolean;
  onLogOut: () => void;
}

export interface INavState {}

export interface IDashboardProps extends IAppState {}

export interface IDashboardState {
  params: object;
}

export interface IProfileProps {
  user: {
    userName: string,
    email: string,
    token: string
  };
}

export interface IProfileState {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  aboutMe: string;
  aboutMeUpdate: string;
  uploading: boolean;
  images?: Array<{public_id: string; secure_url: string }>;
  avatar?: string;
}