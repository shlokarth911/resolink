import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { userLogOut } from "../../../../services/user";

const HomePageHeader = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userLogOut();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("user_token");
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p>Welcome</p>
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar size="lg">
                  <AvatarImage src="" alt="shadcn" />
                  <AvatarFallback>
                    {name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 transform -translate-x-10">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/user/profile" className="text-base w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/user/issues" className="text-base w-full">
                    Your Issues
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-light">
          Raise Issues. Get Them Resolved. Powered by AI
        </h2>
        <Badge className="mt-4 bg-gradient-to-r from-blue-600/40 via-purple-500/40 to-pink-500/40 text-white border-none text-sm">
          <Sparkles size={20} />
          Powered by Gemini-3
        </Badge>
      </div>
    </div>
  );
};

export default HomePageHeader;
