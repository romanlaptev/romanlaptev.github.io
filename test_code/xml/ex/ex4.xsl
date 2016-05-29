<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
method="html"
encoding="UTF-8"
indent="yes"
version="1.0"
omit-xml-declaration="yes"
media-type="text/html"
standalone="yes"
/>

<!-- Шаблоны для генерации текстового контента -->

<xsl:template match="/book">
<html>
<head>
<title>XML Book Outline</title>
<style type="text/css">
body { font-size: smaller }
div, img { border: 0px; margin: 0px; padding: 0px }
div.Node * { vertical-align: middle }
</style>
</head>
<body>
<b><xsl:value-of select="@title"/></b>
<xsl:apply-templates mode="line"/>
</body>
</html>
</xsl:template>

<!-- Рисуем каждую строку дерева -->

<xsl:template match="*" mode="line">
<div class="Node">
<xsl:call-template name="graft"/>
<xsl:apply-templates select="." mode="item"/>
</div>
<xsl:apply-templates mode="line"/>
</xsl:template>

<!-- Отображаем различные типы элементов -->

<xsl:template match="chapter" mode="item">
<i><xsl:value-of select="@title"/></i>
</xsl:template>

<xsl:template match="section" mode="item">
<xsl:value-of select="@title"/>
</xsl:template>

<!-- Шаблоны, используемые для генерации "заборчика" из различных соединителей -->

<xsl:template name="graft">
<!-- Отрисовываем картинки-соединители для всех предков -->
<xsl:apply-templates select="ancestor::*" mode="tree"/>

<!-- Рисуем коннектор для текущего узла -->
<xsl:choose>
<xsl:when test="following-sibling::*">
<img src="tree_tee.gif"/>
</xsl:when>
<xsl:otherwise>
<img src="tree_corner.gif"/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<!-- Запрещаем отрисовку соединителя для корневого узла -->

<xsl:template match="book" mode="tree"/>

<!-- Рисуем соединители для всех остальных узлов -->

<xsl:template match="*" mode="tree">
<xsl:choose>
<xsl:when test="following-sibling::*">
<img src="tree_bar.gif"/>
</xsl:when>
<xsl:otherwise>
<img src="tree_spacer.gif"/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

</xsl:stylesheet>