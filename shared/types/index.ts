export interface IUser {
	id: string;
	email: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface IAuthResponse {
	success: boolean;
	user: IUser;
	token: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface IApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface IPolicyRecommendation {
	id: string;
	title: string;
	description: string;
	category: string;
	priority: 'low' | 'medium' | 'high';
	estimatedCost: number;
	estimatedTimeframe: string;
	benefits: string[];
	risks: string[];
	createdAt: string;
	updatedAt: string;
} 