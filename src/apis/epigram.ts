import { apiFetch } from './apiFetch';

export type Epigram = {
  likeCount?: number;
  id: number;
  content: string;
  author: string;
  referenceTitle?: string | null;
  referenceUrl?: string | null;
  writerId?: number;
  isLiked?: boolean;
  tags: {
    id: number;
    name: string;
  }[];
};

export type GetEpigramsResponse = {
  list: Epigram[];
  nextCursor: number | null;
};

export type EpigramCommentWriter = {
  image: string | null;
  nickname: string;
  id: number;
};

export type EpigramComment = {
  epigramId: number;
  writer: EpigramCommentWriter;
  updatedAt: string;
  createdAt: string;
  isPrivate: boolean;
  content: string;
  id: number;
};

export type GetEpigramCommentsResponse = {
  totalCount: number;
  nextCursor: number | null;
  list: EpigramComment[];
};

export type CreateEpigramCommentRequest = {
  epigramId: number;
  content: string;
  isPrivate: boolean;
};

export type UpdateEpigramCommentRequest = {
  content: string;
  isPrivate: boolean;
};

export type CreateEpigramRequest = {
  tags: string[];
  content: string;
  author: string;
  referenceTitle?: string;
  referenceUrl?: string;
};

export type UpdateEpigramRequest = {
  tags: string[];
  content: string;
  author: string;
  referenceTitle?: string;
  referenceUrl?: string;
};

// 에피그램 목록 조회
export const getEpigrams = async (
  cursor?: number | null,
  limit: number = 6,
): Promise<GetEpigramsResponse> => {
  const query = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor !== null && cursor !== undefined) {
    query.append('cursor', String(cursor));
  }

  return apiFetch(`/epigrams?${query.toString()}`);
};

// 에피그램 상세 조회
export const getEpigram = async (id: number): Promise<Epigram> => {
  return apiFetch(`/epigrams/${id}`);
};

export const likeEpigram = async (id: number): Promise<Epigram> => {
  return apiFetch(`/epigrams/${id}/like`, {
    method: 'POST',
  });
};

export const unlikeEpigram = async (id: number): Promise<Epigram> => {
  return apiFetch(`/epigrams/${id}/like`, {
    method: 'DELETE',
  });
};

export const getEpigramComments = async (
  epigramId: number,
  cursor?: number | null,
  limit: number = 10,
): Promise<GetEpigramCommentsResponse> => {
  const query = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor !== null && cursor !== undefined) {
    query.append('cursor', String(cursor));
  }

  return apiFetch(`/epigrams/${epigramId}/comments?${query.toString()}`, {
    skipAuth: true,
  });
};

export const createEpigramComment = async (
  body: CreateEpigramCommentRequest,
): Promise<EpigramComment> => {
  return apiFetch('/comments', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const updateEpigramComment = async (
  id: number,
  body: UpdateEpigramCommentRequest,
): Promise<EpigramComment> => {
  return apiFetch(`/comments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

export const deleteEpigramComment = async (id: number) => {
  return apiFetch(`/comments/${id}`, {
    method: 'DELETE',
  });
};

// 에피그램 작성
export const createEpigram = async (body: CreateEpigramRequest) => {
  return apiFetch('/epigrams', {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

// 에피그램 수정
export const updateEpigram = async (
  id: number,
  body: UpdateEpigramRequest,
) => {
  return apiFetch(`/epigrams/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

// 에피그램 삭제
export const deleteEpigram = async (id: number) => {
  return apiFetch(`/epigrams/${id}`, {
    method: 'DELETE',
  });
};
