
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

export interface IUserProfileDB {
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  token: string;
  about_me?: string;
  avatar?: any;
}

// Campaigns
// export interface ICampaingsProps extends IProfileProps {}
export interface ICampaingsState {
  campaigns: any[]
}

export interface IProject {
  id: string;
  projectTitle: string;
  shortDescription: string;
  summary: string;
  background: string;
  detailedDescription: string;
  projectImpact: string;
  location: string;
  selectedCategories: { text: string; id: number; }[],
  organizationName: string;
  organizationDescription: string;
  organizationWebsite: string;
  projectAdministrators: string[];
  projectAmbassadors: string[];
  milestones: { name: string; description: string; start: Date; }[];
  budget: { name: string; description: string; amount: number; }[];
  totalBudget: number;
  raised: number;
  threshold: number;
  startDate: Date;
  whatWith5: string;
  whatWith10: string;
  whatWith25: string;
  whatWith100: string;
  whatWith200: string;
  whatWith500: string;
  projectHolder: {
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }
}