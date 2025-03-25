import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';

export const NAV_LIST = [
  {
    title: 'Tin Nhắn CXL ',
    icon: (
      <Badge
        variant="dot"
        sx={{ "& .MuiBadge-dot": { backgroundColor: "white" } }}
      >
        <MailIcon />
      </Badge>
    ),
    href: '/dashboard',
  },
];
