"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, FolderIcon, FileIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  children?: Category[]
  posts?: Post[]
}

interface Post {
  id: string
  title: string
  slug: string
}

// 샘플 카테고리 데이터
const categories: Category[] = [
  {
    id: "1",
    name: "프론트엔드",
    slug: "frontend",
    children: [
      {
        id: "1-1",
        name: "React",
        slug: "react",
        posts: [
          { id: "1-1-1", title: "React 기초 배우기", slug: "react-basics" },
          { id: "1-1-2", title: "React Hooks 완벽 가이드", slug: "react-hooks" },
          { id: "1-1-3", title: "상태 관리 전략", slug: "state-management" },
        ],
      },
      {
        id: "1-2",
        name: "Next.js",
        slug: "nextjs",
        posts: [
          { id: "1-2-1", title: "Next.js 13 App Router 소개", slug: "nextjs-app-router" },
          { id: "1-2-2", title: "서버 컴포넌트 vs 클라이언트 컴포넌트", slug: "server-vs-client-components" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "백엔드",
    slug: "backend",
    children: [
      {
        id: "2-1",
        name: "Node.js",
        slug: "nodejs",
        posts: [
          { id: "2-1-1", title: "Express로 REST API 만들기", slug: "express-rest-api" },
          { id: "2-1-2", title: "Node.js 성능 최적화", slug: "nodejs-performance" },
        ],
      },
      {
        id: "2-2",
        name: "데이터베이스",
        slug: "database",
        posts: [
          { id: "2-2-1", title: "SQL vs NoSQL", slug: "sql-vs-nosql" },
          { id: "2-2-2", title: "PostgreSQL 기초", slug: "postgresql-basics" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "DevOps",
    slug: "devops",
    posts: [
      { id: "3-1", title: "Docker 기초", slug: "docker-basics" },
      { id: "3-2", title: "CI/CD 파이프라인 구축", slug: "ci-cd-pipeline" },
    ],
  },
  {
    id: "4",
    name: "알고리즘",
    slug: "algorithms",
    posts: [
      { id: "4-1", title: "정렬 알고리즘 비교", slug: "sorting-algorithms" },
      { id: "4-2", title: "그래프 탐색 알고리즘", slug: "graph-traversal" },
    ],
  },
]

interface CategoryTreeProps {
  setOpen?: (open: boolean) => void
}

export function CategoryTree({ setOpen }: CategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "1": true, // 기본적으로 프론트엔드 카테고리 열기
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleLinkClick = () => {
    if (setOpen) {
      setOpen(false)
    }
  }

  const renderCategory = (category: Category, level = 0) => {
    const isExpanded = expandedCategories[category.id]
    const hasChildren = !!(category.children?.length || category.posts?.length)

    return (
      <div key={category.id} className="flex flex-col">
        <div className={cn("flex items-center py-1", level > 0 && "ml-4")}>
          {hasChildren ? (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleCategory(category.id)}>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          ) : (
            <div className="w-6" />
          )}
          <div className="flex items-center">
            <FolderIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <Link
              href={`/category/${category.slug}`}
              className="text-sm font-medium hover:underline"
              onClick={handleLinkClick}
            >
              {category.name}
            </Link>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-2">
            {category.children?.map((child) => renderCategory(child, level + 1))}
            {category.posts?.map((post) => (
              <div key={post.id} className="flex items-center py-1 ml-8">
                <FileIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <Link href={`/posts/${post.slug}`} className="text-sm hover:underline" onClick={handleLinkClick}>
                  {post.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="py-2">
      <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">카테고리</h2>
      <div className="space-y-1">{categories.map((category) => renderCategory(category))}</div>
    </div>
  )
}
