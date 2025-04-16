/* eslint-disable react/prop-types */
"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                {item.disabled ? (
                  <span className="text-gray-400 hover:cursor-not-allowed hover:opacity-50">
                    <item.icon />
                    {item.title}
                  </span>
                ) : (
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                )}
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRightIcon />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) =>
                        subItem.disabled ? (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <span className="text-sm text-gray-400 hover:cursor-not-allowed hover:opacity-50">
                                {subItem.title}
                              </span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ) : (
                          <SidebarMenuSubItem key={subItem.title}>
                            <a href={subItem.url}>
                              <span className="text-sm">{subItem.title}</span>
                            </a>
                          </SidebarMenuSubItem>
                        )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
