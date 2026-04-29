import { useState } from 'react'
import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ModeCommentOutlined'
import RepeatIcon from '@mui/icons-material/Repeat'
import IosShareIcon from '@mui/icons-material/IosShare'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const PAGE_BG = '#000000'
const CONTAINER_BG = '#1c1c1e'
const CONTAINER_BORDER = '1px solid #2c2c2e'
const DIVIDER_COLOR = '#2c2c2e'
const PRIMARY = '#FFFFFF'
const SECONDARY = '#8e8e93'

interface ActionCounts {
  likes: number
  comments: number
  reposts: number
  boosts: number
}

interface PostData {
  id: string
  username: string
  timestamp: string
  paragraphs: string[]
  actions: ActionCounts
}

const mainPost: PostData = {
  id: 'main',
  username: 'sakura_dreams',
  timestamp: '9h',
  paragraphs: [
    'After 3 years with React, the ecosystem evolution still impresses me.',
    'Hooks, server components — each shift made the DX genuinely better. The "UI as a function of state" mental model is just clean.',
  ],
  actions: { likes: 246, comments: 13, reposts: 29, boosts: 52 },
}

const replies: PostData[] = [
  {
    id: 'reply-1',
    username: 'moonlight_echo',
    timestamp: '7h',
    paragraphs: [
      'Hooks migration was rough but custom hooks killed so much boilerplate. Stopped mapping lifecycle methods and it all clicked.',
    ],
    actions: { likes: 47, comments: 2, reposts: 1, boosts: 4 },
  },
  {
    id: 'reply-2',
    username: 'starfall_whisper',
    timestamp: '5h',
    paragraphs: [
      'RSC is the next big shift. Server + client rendering at the component level is wild — performance gains are real.',
    ],
    actions: { likes: 28, comments: 2, reposts: 0, boosts: 1 },
  },
]

const flexRow = (extra?: object) => ({
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
  ...extra,
})

function ActionBar({ counts, small = false, replyOnly = false }: { counts: ActionCounts; small?: boolean; replyOnly?: boolean }) {
  const sz = small ? 17 : 19
  const iconSx = { fontSize: sz, color: SECONDARY }

  const allItems = [
    { icon: <FavoriteBorderIcon sx={iconSx} />, count: counts.likes },
    { icon: <ChatBubbleOutlineIcon sx={iconSx} />, count: counts.comments },
    { icon: <RepeatIcon sx={iconSx} />, count: counts.reposts },
    { icon: <IosShareIcon sx={iconSx} />, count: counts.boosts },
  ]

  const items = replyOnly
    ? [{ icon: <FavoriteBorderIcon sx={iconSx} />, count: counts.likes }]
    : allItems

  return (
    <Box sx={{ ...flexRow({ gap: '20px' }), mt: 1.5 }}>
      {items.map(({ icon, count }, i) => (
        <Box key={i} sx={{ ...flexRow({ gap: '5px' }), cursor: 'pointer', userSelect: 'none' }}>
          {icon}
          <Typography variant={small ? 'caption' : 'body2'} sx={{ color: SECONDARY }}>
            {count}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

function PostAvatar() {
  return (
    <Box sx={{ position: 'relative', flexShrink: 0 }}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: '#7B3F00',
          fontSize: 13,
          fontWeight: 700,
          border: '2px solid #3a1a00',
        }}
      >
        S
      </Avatar>
      <Box
        sx={{
          position: 'absolute',
          bottom: -2,
          right: -2,
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: '#2c2c2e',
          border: `2px solid ${CONTAINER_BG}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AddIcon sx={{ fontSize: 11, color: PRIMARY }} />
      </Box>
    </Box>
  )
}

function PostHeader({
  username,
  timestamp,
}: {
  username: string
  timestamp: string
}) {
  return (
    <Box sx={{ ...flexRow({ gap: '6px', flex: 1, minWidth: 0 }) }}>
      <Typography variant="body2" noWrap sx={{ color: PRIMARY, fontWeight: 700 }}>
        {username}
      </Typography>

      <Box sx={{ flex: 1 }} />

      <Typography variant="caption" sx={{ color: SECONDARY, whiteSpace: 'nowrap' }}>
        {timestamp}
      </Typography>
      <IconButton size="small" sx={{ color: SECONDARY, p: '2px', flexShrink: 0 }}>
        <MoreHorizIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  )
}

function PostBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Box sx={{ mt: 0.75 }}>
      {paragraphs.map((p, i) => (
        <Typography key={i} variant="body2" sx={{ color: PRIMARY, lineHeight: 1.65, mb: 0.75 }}>
          {p}
        </Typography>
      ))}
    </Box>
  )
}

function MainPost({ post }: { post: PostData }) {
  return (
    <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
      <Box sx={{ ...flexRow({ gap: '10px' }) }}>
        <PostAvatar />
        <PostHeader username={post.username} timestamp={post.timestamp} />
      </Box>
      <Box sx={{ mt: 1, px: '5px' }}>
        <PostBody paragraphs={post.paragraphs} />
        <ActionBar counts={post.actions} />
      </Box>
    </Box>
  )
}

function ReplyCard({ post }: { post: PostData }) {
  return (
    <Box>
      <Divider sx={{ borderColor: DIVIDER_COLOR }} />
      <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
        <Box sx={{ ...flexRow({ gap: '12px', alignItems: 'flex-start' }) }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              alignSelf: 'stretch',
            }}
          >
            <PostAvatar />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, pb: 0.5 }}>
            <PostHeader username={post.username} timestamp={post.timestamp} />
            <PostBody paragraphs={post.paragraphs} />
            <ActionBar counts={post.actions} small replyOnly />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default function ThreadDetail() {
  const [, setSortOpen] = useState(false)

  return (
    <Box
      sx={{
        bgcolor: PAGE_BG,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 0, sm: 3 },
        px: { xs: 0, sm: 2 },
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          bgcolor: CONTAINER_BG,
          width: '100%',
          maxWidth: 600,
          borderRadius: { xs: 0, sm: '16px' },
          border: { xs: 'none', sm: CONTAINER_BORDER },
          overflow: 'hidden',
          alignSelf: 'flex-start',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <Box
          sx={{
            ...flexRow({ justifyContent: 'space-between' }),
            px: 1,
            py: 1.25,
            bgcolor: CONTAINER_BG,
            borderBottom: CONTAINER_BORDER,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <IconButton sx={{ color: PRIMARY }}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ color: PRIMARY, fontWeight: 700, lineHeight: 1.2 }}>
              Thread
            </Typography>
            <Typography variant="caption" sx={{ color: SECONDARY, display: 'block' }}>
              134K views
            </Typography>
          </Box>

          <IconButton sx={{ color: PRIMARY }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>

        <MainPost post={mainPost} />

        <Divider sx={{ borderColor: DIVIDER_COLOR, mx: 2 }} />

        <Box sx={{ ...flexRow({ justifyContent: 'space-between' }), px: 2, py: 1.25 }}>
          <Box sx={{ ...flexRow({ gap: '2px' }), cursor: 'pointer' }} onClick={() => setSortOpen(v => !v)}>
            <Typography variant="body2" sx={{ color: SECONDARY, fontWeight: 500 }}>
              Top
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: SECONDARY }} />
          </Box>

          <Typography
            variant="body2"
            sx={{ color: SECONDARY, cursor: 'pointer', fontSize: '0.8rem', '&:hover': { color: PRIMARY } }}
          >
            View activity →
          </Typography>
        </Box>

        <Divider sx={{ borderColor: DIVIDER_COLOR }} />

        <Box>
          {replies.map((reply, i) => (
          <ReplyCard key={reply.id} post={reply} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
