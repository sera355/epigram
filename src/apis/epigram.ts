import { apiFetch } from './apiFetch';

export type Epigram = {
  id: number;
  content: string;
  author: string;
  referenceTitle?: string;
  referenceUrl?: string;
  tags: string[];
};

export type GetEpigramsResponse = {
  list: Epigram[];
  nextCursor: number | null;
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

  if (cursor) {
    query.append('cursor', String(cursor));
  }

  return apiFetch(`/epigrams?${query.toString()}`);
};

// 에피그램 상세 조회
export const getEpigram = async (id: number) => {
  return apiFetch(`/epigrams/${id}`);
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