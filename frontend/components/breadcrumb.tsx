"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-slate-600 mb-4">
      <Link href="/" className="hover:text-slate-900 transition-colors">
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-slate-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
