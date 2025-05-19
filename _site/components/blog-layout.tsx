"use client"

import type React from "react"

import { useState } from "react"
import { CategoryTree } from "@/components/category-tree"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface BlogLayoutProps {
  children: React.ReactNode
}

export function BlogLayout({ children }: BlogLayoutProps) {
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="mr-4 flex">
            {isMobile && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                  <div className="py-4">
                    <CategoryTree setOpen={setOpen} />
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-bold">개발자 블로그</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline">로그인</Button>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:gap-10 px-4 py-6">
        {!isMobile && (
          <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
            <CategoryTree />
          </aside>
        )}
        <main className="relative py-6 md:py-0 lg:gap-10 lg:py-8">{children}</main>
      </div>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 개발자 블로그. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
