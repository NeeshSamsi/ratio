import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react"

type CardContextType = {
  image: React.ReactNode | null
  title: React.ReactNode | null
  content: React.ReactNode | null
  orientation: "vertical" | "horizontal"
  setImage: (element: React.ReactNode | null) => void
  setTitle: (element: React.ReactNode | null) => void
  setContent: (element: React.ReactNode | null) => void
  setOrientation: (orientation: "vertical" | "horizontal") => void
}

const CardContext = createContext<CardContextType>({
  image: null,
  title: null,
  content: null,
  orientation: "vertical",
  setImage: () => void 0,
  setTitle: () => void 0,
  setContent: () => void 0,
  setOrientation: () => void 0,
})

export const CardProvider = ({ children }: PropsWithChildren) => {
  const [image, setImage] = useState<React.ReactNode | null>(null)
  const [title, setTitle] = useState<React.ReactNode | null>(null)
  const [content, setContent] = useState<React.ReactNode | null>(null)
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(
    "vertical",
  )

  const cardContextValue = useMemo(
    () => ({
      image,
      title,
      content,
      orientation,
      setImage,
      setTitle,
      setContent,
      setOrientation,
    }),
    [
      image,
      title,
      content,
      orientation,
      setImage,
      setTitle,
      setContent,
      setOrientation,
    ],
  )

  return (
    <CardContext.Provider value={cardContextValue}>
      {children}
    </CardContext.Provider>
  )
}

export const useCardContext = () => {
  const context = useContext(CardContext)

  return context
}
