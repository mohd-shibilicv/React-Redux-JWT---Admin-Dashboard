import { useState, useEffect } from "react";
import { fetchAllUsers } from "../../../api/utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  Checkbox,
} from "@material-tailwind/react";
import {
  deleteUserFailure,
  deleteUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Email", "Status", "Joined", ""];

const formatDate = (rawDate) => {
  const dateObject = new Date(rawDate);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return formattedDate;
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [formData, setFormData] = useState({});
  const [EditFormData, setEditFormData] = useState({});

  const TABLE_ROWS = users.map((user) => ({
    id: user._id,
    img: user.profilePicture,
    name: user.username,
    email: user.email,
    online: user.isActive,
    date: formatDate(user.createdAt),
  }));

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        const filteredUsers = fetchedUsers.filter(
          (user) => user._id !== currentUser._id
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch({ type: "SET_LOADING", payload: false });
      if (data.success === false) {
        dispatch({
          type: "SET_ERROR",
          payload: true,
          errorMessage: "Something went wrong. try again!",
        });
        return;
      }
      const updatedUsers = await fetchAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const handleDelete = async (userId) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/admin/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TABLE_ROWS2 = filteredUsers.map((user) => ({
    id: user._id,
    img: user.profilePicture,
    name: user.username,
    email: user.email,
    online: user.isActive,
    date: formatDate(user.createdAt),
  }));

  return (
    <Card className="h-full w-full p-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            <Button
              onClick={handleOpen}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full max-w-[24rem]">
                <form onSubmit={handleSubmit}>
                  <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                      Add
                    </Typography>
                    <Typography
                      className="mb-3 font-normal"
                      variant="paragraph"
                      color="gray"
                    >
                      Enter member's username, email and password.
                    </Typography>
                    <Typography className="-mb-2" variant="h6">
                      Username
                    </Typography>
                    <Input
                      type=""
                      id="username"
                      label="Username"
                      size="lg"
                      onChange={handleChange}
                    />
                    <Typography className="-mb-2" variant="h6">
                      Email
                    </Typography>
                    <Input
                      type="email"
                      id="email"
                      label="Email"
                      size="lg"
                      onChange={handleChange}
                    />
                    <Typography className="-mb-2" variant="h6">
                      Password
                    </Typography>
                    <Input
                      type="password"
                      id="password"
                      label="Password"
                      size="lg"
                      onChange={handleChange}
                    />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      type="submit"
                      onClick={handleOpen}
                      variant="gradient"
                      fullWidth
                    >
                      Add
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
          {/* <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr className="flex mx-auto items-center text-center justify-center h-20 w-full">
                <td>
                  <Typography
                    className="text-center"
                    variant="h4"
                    color="blue-gray"
                  >
                    No users yet
                  </Typography>
                </td>
              </tr>
            ) : (
              <>
                {(searchTerm ? TABLE_ROWS2 : TABLE_ROWS).map(
                  ({ id, img, name, email, online, date }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {email}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={online ? "online" : "offline"}
                              color={online ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>
                        {/* <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton
                              variant="text"
                              className="hover:text-indigo-600"
                              onClick={handleOpen}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td> */}
                        <td className={classes}>
                          <Tooltip content="Delete User">
                            <IconButton
                              variant="text"
                              className="hover:text-red-600"
                              onClick={() => handleDelete(id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
              </>
            )}
          </tbody>
        </table>
      </CardBody>
      {users.length > 10 && (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
