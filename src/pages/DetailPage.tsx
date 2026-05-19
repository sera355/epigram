import Header from '@/components/Header/Header';
import waveLine from '@/assets/images/waveLine.svg';
import ConfirmModal from '@/components/ConfirmModal';
import CommentProfileModal from '@/components/CommentProfileModal';
import NoticeModal from '@/components/NoticeModal';
import more from '@/assets/icons/more-md.png';
import share from '@/assets/icons/Share.png';
import like from '@/assets/icons/like.png';
import profileImage from '@/assets/profileImages/profile01.png';
import bgImage from '@/assets/images/landing-bg.png';


import {
  createEpigramComment,
  deleteEpigram,
  deleteEpigramComment,
  getEpigram,
  getEpigramComments,
  likeEpigram,
  unlikeEpigram,
  updateEpigramComment,
  type Epigram,
  type GetEpigramCommentsResponse,
} from '@/apis/epigram';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockEpigrams = {
    likeCount: 21,
    tags: [{name: "태그", id: 1}, {name: "인생", id: 2}, ],
    writerId: 1,
    referenceUrl: "https://www.yes24.com/product/goods/18743437",
    referenceTitle: "참고 링크",
    author: '작가',
    content: '에피그램을 불러오는 중입니다.',
    id: 1,
    isLiked: true,
  }

const getCurrentUserId = () => {
  const user = localStorage.getItem('user');

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user).id as number;
  } catch {
    return null;
  }
};

const formatCommentTime = (createdAt: string) => {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(createdAt));
};

const initialCommentsResponse: GetEpigramCommentsResponse = {
  totalCount: 0,
  nextCursor: null,
  list: [],
};

type DeleteTarget =
  | { type: 'epigram' }
  | { type: 'comment'; commentId: number };

type SelectedCommentProfile = {
  image: string;
  name: string;
  content: string;
};

export default function  EpigramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const epigramId = Number(id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [epigram, setEpigram] = useState<Epigram | null>(null);
  const [epigramErrorMessage, setEpigramErrorMessage] = useState('');
  const [isHandlingEpigram, setIsHandlingEpigram] = useState(false);
  const [commentsResponse, setCommentsResponse] = useState(
    initialCommentsResponse,
  );
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [handlingCommentId, setHandlingCommentId] = useState<number | null>(
    null,
  );
  const [commentsErrorMessage, setCommentsErrorMessage] = useState('');
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const commentsLoadMoreRef = useRef<HTMLDivElement | null>(null);
  const [commentSubmitErrorMessage, setCommentSubmitErrorMessage] =
    useState('');
  const [commentManageErrorMessage, setCommentManageErrorMessage] =
    useState('');
  const [likeErrorMessage, setLikeErrorMessage] = useState('');
  const [isHandlingLike, setIsHandlingLike] = useState(false);
  const [isEpigramDeleteSuccessOpen, setIsEpigramDeleteSuccessOpen] =
    useState(false);
  const [isCommentDeleteSuccessOpen, setIsCommentDeleteSuccessOpen] =
    useState(false);
  const [selectedCommentProfile, setSelectedCommentProfile] =
    useState<SelectedCommentProfile | null>(null);
  const currentUserId = getCurrentUserId();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(mockEpigrams.likeCount);
  const isMyEpigram = epigram?.writerId === currentUserId;
  const referenceUrl = epigram?.referenceUrl?.trim();
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const isDeleting =
    deleteTarget?.type === 'epigram'
      ? isHandlingEpigram
      : deleteTarget?.type === 'comment'
        ? handlingCommentId === deleteTarget.commentId
        : false;

  useEffect(() => {
    if (!Number.isFinite(epigramId)) {
      return;
    }

    const loadEpigram = async () => {
      try {
        const data = await getEpigram(epigramId);

        setEpigram(data);
        setLikeCount(data.likeCount ?? 0);
        setIsLiked(Boolean(data.isLiked));
        setEpigramErrorMessage('');
      } catch (error) {
        if (error instanceof Error) {
          setEpigramErrorMessage(error.message);
        } else {
          setEpigramErrorMessage('에피그램을 불러오지 못했습니다.');
        }
      }
    };

    loadEpigram();
  }, [epigramId]);

  useEffect(() => {
    const epigramId = Number(id);

    if (!Number.isFinite(epigramId)) {
      return;
    }

    const loadComments = async () => {
      try {
        const data = await getEpigramComments(epigramId, null, 10);

        setCommentsResponse(data);
        setCommentsErrorMessage('');
      } catch (error) {
        if (error instanceof Error) {
          setCommentsErrorMessage(error.message);
        } else {
          setCommentsErrorMessage('댓글을 불러오지 못했습니다.');
        }
      }
    };

    loadComments();
  }, [id]);

  const handleLoadMoreComments = useCallback(async () => {
    if (
      !Number.isFinite(epigramId) ||
      commentsResponse.nextCursor === null ||
      isLoadingMoreComments
    ) {
      return;
    }

    try {
      setIsLoadingMoreComments(true);
      setCommentsErrorMessage('');

      const data = await getEpigramComments(
        epigramId,
        commentsResponse.nextCursor,
        10,
      );

      setCommentsResponse((prev) => ({
        totalCount: data.totalCount,
        nextCursor: data.nextCursor,
        list: [...prev.list, ...data.list],
      }));
    } catch (error) {
      if (error instanceof Error) {
        setCommentsErrorMessage(error.message);
      } else {
        setCommentsErrorMessage('댓글을 불러오지 못했습니다.');
      }
    } finally {
      setIsLoadingMoreComments(false);
    }
  }, [
    commentsResponse.nextCursor,
    epigramId,
    isLoadingMoreComments,
  ]);

  useEffect(() => {
    const target = commentsLoadMoreRef.current;

    if (!target || commentsResponse.nextCursor === null) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          void handleLoadMoreComments();
        }
      },
      {
        rootMargin: '160px',
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [commentsResponse.nextCursor, handleLoadMoreComments]);

  const handleCreateComment = async () => {
    if (
      !Number.isFinite(epigramId) ||
      isSubmittingComment ||
      commentContent.trim().length === 0
    ) {
      return;
    }

    try {
      setIsSubmittingComment(true);
      setCommentSubmitErrorMessage('');

      await createEpigramComment({
        epigramId,
        content: commentContent.trim(),
        isPrivate: false,
      });

      const data = await getEpigramComments(epigramId, null, 10);

      setCommentsResponse(data);
      setCommentContent('');
    } catch (error) {
      if (error instanceof Error) {
        setCommentSubmitErrorMessage(error.message);
      } else {
        setCommentSubmitErrorMessage('댓글을 작성하지 못했습니다.');
      }
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCommentKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();
    void handleCreateComment();
  };

  const handleToggleLike = async () => {
    if (!Number.isFinite(epigramId)) {
      return;
    }

    try {
      setIsHandlingLike(true);
      setLikeErrorMessage('');

      if (isLiked) {
        await unlikeEpigram(epigramId);
      } else {
        await likeEpigram(epigramId);
      }

      const data = await getEpigram(epigramId);

      setEpigram(data);
      setLikeCount(data.likeCount ?? 0);
      setIsLiked(Boolean(data.isLiked));
    } catch (error) {
      if (error instanceof Error) {
        setLikeErrorMessage(error.message);
      } else {
        setLikeErrorMessage('좋아요 처리에 실패했습니다.');
      }
    } finally {
      setIsHandlingLike(false);
    }
  };

  const handleRequestDeleteEpigram = () => {
    setIsMenuOpen(false);
    setEpigramErrorMessage('');
    setDeleteTarget({ type: 'epigram' });
  };

  const handleDeleteEpigram = async () => {
    if (!Number.isFinite(epigramId)) {
      return;
    }

    try {
      setIsHandlingEpigram(true);
      setEpigramErrorMessage('');

      await deleteEpigram(epigramId);
      setDeleteTarget(null);
      setIsEpigramDeleteSuccessOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setEpigramErrorMessage(error.message);
      } else {
        setEpigramErrorMessage('에피그램을 삭제하지 못했습니다.');
      }
    } finally {
      setIsHandlingEpigram(false);
    }
  };

  const handleStartEditComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
    setCommentManageErrorMessage('');
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const handleUpdateComment = async (commentId: number) => {
    if (
      !Number.isFinite(epigramId) ||
      editingCommentContent.trim().length === 0
    ) {
      return;
    }

    try {
      setHandlingCommentId(commentId);
      setCommentManageErrorMessage('');

      await updateEpigramComment(commentId, {
        content: editingCommentContent.trim(),
        isPrivate: false,
      });

      const data = await getEpigramComments(epigramId, null, 10);

      setCommentsResponse(data);
      handleCancelEditComment();
    } catch (error) {
      if (error instanceof Error) {
        setCommentManageErrorMessage(error.message);
      } else {
        setCommentManageErrorMessage('댓글을 수정하지 못했습니다.');
      }
    } finally {
      setHandlingCommentId(null);
    }
  };

  const handleRequestDeleteComment = (commentId: number) => {
    setCommentManageErrorMessage('');
    setDeleteTarget({ type: 'comment', commentId });
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!Number.isFinite(epigramId)) {
      return;
    }

    try {
      setHandlingCommentId(commentId);
      setCommentManageErrorMessage('');

      await deleteEpigramComment(commentId);

      const data = await getEpigramComments(epigramId, null, 10);

      setCommentsResponse(data);

      if (editingCommentId === commentId) {
        handleCancelEditComment();
      }

      setDeleteTarget(null);
      setIsCommentDeleteSuccessOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setCommentManageErrorMessage(error.message);
      } else {
        setCommentManageErrorMessage('댓글을 삭제하지 못했습니다.');
      }
    } finally {
      setHandlingCommentId(null);
    }
  };

  const handleCancelDelete = () => {
    if (isDeleting) {
      return;
    }

    setDeleteTarget(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget?.type === 'epigram') {
      void handleDeleteEpigram();
      return;
    }

    if (deleteTarget?.type === 'comment') {
      void handleDeleteComment(deleteTarget.commentId);
    }
  };

  
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F7FA]">

        {/* 에피그램 상세 영역 */}
        <section className="group bg-white relative min-h-[472px] bg-position-[center_top]" style={{backgroundImage: `url(${bgImage})`}}>
  

          <div className="mx-auto w-[640px] pt-[120px] pb-[40px]">


            {/* 태그 + 더보기 버튼 */}
            <div className="mb-[24px] flex items-center justify-between">

              {/* 태그 */}
              <div className="font-['Pretendard'] flex gap-[12px] text-[20px] text-(--color-blue-400)">
                {(epigram?.tags ?? []).map((tag)=> (
                  <span key={tag.id}>#{tag.name}</span>
                ))}
              </div>

              {/* 바로가기 버튼 + 더보기 버튼 + 드롭다운 */}
              {(referenceUrl || isMyEpigram) && (
                <div className="relative flex items-center gap-[12px]">
                  {referenceUrl && (
                    <a
                      href={referenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-[40px] items-center rounded-full bg-(--color-blue-400) px-[18px] font-['Pretendard'] text-[16px] text-white shadow-sm"
                    >
                      새창
                    </a>
                  )}

                  {isMyEpigram && (
                    <div className="relative">
                      <button type="button" onClick={()=>setIsMenuOpen((prev)=>!prev)} className="cursor-pointer">
                        <img src={more} className="w-[36px]"/>
                      </button>


                      {/* 드롭다운 */}
                      {isMenuOpen && (
                        <div className="absolute right-0 top-[48px] z-50 flex h-[112px] min-w-max flex-col rounded-[20px] border border-[#D7E0EE] bg-white shadow-sm">
                          <button
                            type="button"
                            onClick={() => navigate(`/epigrams/${epigramId}/edit`)}
                            disabled={isHandlingEpigram}
                            className="cursor-pointer flex flex-1 items-center gap-[10px] px-[32px] py-[12px] text-[20px] leading-[32px] font-normal text-(--color-black-600) disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            수정하기
                          </button>
                          <button
                            type="button"
                            onClick={handleRequestDeleteEpigram}
                            disabled={isHandlingEpigram}
                            className="cursor-pointer flex flex-1 items-center gap-[10px] px-[32px] py-[12px] text-[20px] leading-[32px] font-normal text-(--color-black-600) disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
            </div>


            {/* 본문 */}
            {epigramErrorMessage && (
              <p className="mb-[16px] text-[14px] text-red-500">
                {epigramErrorMessage}
              </p>
            )}

            <p className="font-['Iropke_Batang'] text-[32px] leading-[40px] text-(--color-black-700)">
              {epigram?.content ?? ''}
            </p>


            {/* 작가 */}
            <p className="mt-[32px] font-['Iropke_Batang'] text-right text-[24px] text-[#ABB8CE]">
              - {epigram?.author ?? ''} -
            </p>


            {/* 좋아요 / 공유 버튼 */}
            <div className="mt-[36px] flex justify-center gap-[12px]">
              <button
                type="button"
                onClick={handleToggleLike}
                disabled={isHandlingLike}
                className={`cursor-pointer flex h-[48px] items-center gap-[6px] rounded-full px-[16px] text-[20px] font-['Pretendard'] font-semibold 
                  ${isLiked ? 'bg-(--color-black-600) text-white' : 'bg-(--color-line-100) text-(--color-gray-300)' } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <img src={like} className="w-[36px] h-[36px]" />
                <span>{likeCount}</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    window.location.href,
                  );
                  alert('링크가 복사되었습니다.');
                }}
                className="flex h-[48px] cursor-pointer items-center gap-[6px] rounded-full bg-(--color-line-100) px-[16px] text-[20px] font-['Pretendard'] font-medium text-(--color-gray-300)"
              >
                <span>{epigram?.referenceTitle || '공유하기'}</span>
                <img src={share} className="w-[21px] h-[21px]"/>
              </button>
            </div>

            {likeErrorMessage && (
              <p className="mt-[12px] text-center text-[14px] text-red-500">
                {likeErrorMessage}
              </p>
            )}
          </div>

          
          <img src={waveLine} alt="" className="absolute bottom-[-24px] w-full"/>
        </section>

        {/* 댓글 영역 */}
        <section className="mx-auto min-h-[360px] w-[640px] pt-[36px]">
          <h2 className="mb-[16px] text-[16px] font-semibold text-[#2B2B2B]">
            댓글 <span>({commentsResponse.totalCount})</span>
          </h2>

          {/* 댓글 입력 */}
          <div className="mb-[28px] flex gap-[16px]">
            <img
              src={profileImage}
              alt="profile"
              className="h-[40px] w-[40px] rounded-full object-cover"
            />

            <textarea
              placeholder="100자 이내로 입력해주세요."
              maxLength={100}
              value={commentContent}
              onChange={(event) => setCommentContent(event.target.value)}
              onKeyDown={handleCommentKeyDown}
              disabled={isSubmittingComment}
              className="h-[68px] flex-1 resize-none rounded-[8px] border border-[#D7E0EE] bg-white px-[16px] py-[14px] text-[14px] outline-none placeholder:text-[#ABB8CE]"
            />
          </div>

          {/* 이미 달린 댓글 */}
          {commentSubmitErrorMessage && (
            <p className="mb-[16px] text-[14px] text-red-500">
              {commentSubmitErrorMessage}
            </p>
          )}

          <div className="border-t border-[#D7E0EE]">
            {commentManageErrorMessage && (
              <p className="py-[24px] text-[14px] text-red-500">
                {commentManageErrorMessage}
              </p>
            )}

            {commentsErrorMessage && (
              <p className="py-[24px] text-[14px] text-red-500">
                {commentsErrorMessage}
              </p>
            )}

            {commentsResponse.list.map((comment)=>(
              <EditableCommentItem
                key={comment.id}
                image={comment.writer.image ?? profileImage}
                name={comment.writer.nickname}
                time={formatCommentTime(comment.createdAt)}
                content={comment.content}
                isMine={comment.writer.id === currentUserId}
                isEditing={editingCommentId === comment.id}
                editingContent={editingCommentContent}
                isHandling={handlingCommentId === comment.id}
                onEditContentChange={setEditingCommentContent}
                onStartEdit={() =>
                  handleStartEditComment(comment.id, comment.content)
                }
                onCancelEdit={handleCancelEditComment}
                onUpdate={() => handleUpdateComment(comment.id)}
                onDelete={() => handleRequestDeleteComment(comment.id)}
                onOpenProfile={() =>
                  setSelectedCommentProfile({
                    image: comment.writer.image ?? profileImage,
                    name: comment.writer.nickname,
                    content: comment.content,
                  })
                }
              />
            ))}

            <div ref={commentsLoadMoreRef} className="h-[1px]" />

            {isLoadingMoreComments && (
              <p className="py-[24px] text-center text-[14px] text-[#8B95A1]">
                댓글을 불러오는 중입니다.
              </p>
            )}
          </div>
        </section>
      </main>

      {deleteTarget && (
        <ConfirmModal
          title={
            deleteTarget.type === 'epigram'
              ? '에피그램을 삭제할까요?'
              : '댓글을 삭제하시겠어요?'
          }
          description={deleteTarget.type==='epigram'
            ? "에피그램은 삭제 후 복구할 수 없어요."
            : "댓글은 삭제 후 복구할 수 없어요."
          }
          confirmText="삭제"
          pendingConfirmText="삭제 중"
          isPending={isDeleting}
          variant="danger"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isEpigramDeleteSuccessOpen && (
        <NoticeModal
          title="에피그램이 삭제되었어요"
          confirmText="확인"
          onConfirm={() => navigate('/epigramlist')}
        />
      )}

      {isCommentDeleteSuccessOpen && (
        <NoticeModal
          title="댓글이 삭제되었어요"
          confirmText="확인"
          onConfirm={() => setIsCommentDeleteSuccessOpen(false)}
        />
      )}

      {selectedCommentProfile && (
        <CommentProfileModal
          image={selectedCommentProfile.image}
          name={selectedCommentProfile.name}
          content={selectedCommentProfile.content}
          onClose={() => setSelectedCommentProfile(null)}
        />
      )}
    </>
  );
}

type CommentItemProps = {
  image: string;
  name: string;
  time: string;
  content: string;
  isMine?: boolean;
  isEditing: boolean;
  editingContent: string;
  isHandling: boolean;
  onEditContentChange: (content: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onOpenProfile: () => void;
};

function EditableCommentItem({
  image,
  name,
  time,
  content,
  isMine = false,
  isEditing,
  editingContent,
  isHandling,
  onEditContentChange,
  onStartEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onOpenProfile,
}: CommentItemProps) {
  return (
    <article className="flex gap-[16px] border-b border-[#D7E0EE] py-[24px]">
      <button
        type="button"
        onClick={onOpenProfile}
        className="h-[40px] w-[40px] shrink-0 rounded-full cursor-pointer"
      >
        <img
          src={image}
          alt={`${name} 프로필`}
          className="h-full w-full rounded-full object-cover"
        />
      </button>

      <div className="flex-1">
        <div className="mb-[8px] flex items-center justify-between">
          <div className="flex items-center gap-[6px] text-[13px] text-[#8B95A1]">
            <button
              type="button"
              onClick={onOpenProfile}
              className="font-medium hover:text-[#2B2B2B] cursor-pointer"
            >
              {name}
            </button>
            <span>{time}</span>
          </div>

          {isMine && (
            <div className="flex gap-[8px] text-[13px]">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={onUpdate}
                    disabled={
                      isHandling || editingContent.trim().length === 0
                    }
                    className="text-[#8B95A1] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    disabled={isHandling}
                    className="text-[#8B95A1] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onStartEdit}
                    disabled={isHandling}
                    className="text-[#8B95A1] underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    disabled={isHandling}
                    className="text-[#FF6577] underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={editingContent}
            maxLength={100}
            onChange={(event) => onEditContentChange(event.target.value)}
            className="h-[68px] w-full resize-none rounded-[8px] border border-[#D7E0EE] bg-white px-[16px] py-[14px] text-[15px] leading-[26px] text-[#2B2B2B] outline-none"
          />
        ) : (
          <p className="text-[15px] leading-[26px] text-[#2B2B2B]">
            {content}
          </p>
        )}
      </div>
    </article>
  );
}
