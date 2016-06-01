<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<meta charset="utf-8"/>
<body>

<!-- вывести список алфавитных ссылок  -->
<div align="center">
<xsl:for-each select="document ('list.xml')/list">
	<xsl:for-each select="child::*">
		<xsl:choose>
		<xsl:when test="name(.)='a'">
                       <a href="{./@href}"><xsl:value-of select="."/></a> |
		</xsl:when>
		</xsl:choose>
	</xsl:for-each>
</xsl:for-each>
</div>

<!-- вывести все фильмы, названия к-рых начинаются на  varStartWith -->
<xsl:variable name="varStartWith">П</xsl:variable>
<xsl:for-each select="document('video.xml')/video/films/film">
	<xsl:variable name="varFilmName"><xsl:value-of select="@title"/></xsl:variable>

<!-- проверка, начинается ли название фильма на  varStartWith -->
	<xsl:if test="starts-with($varFilmName,$varStartWith)">
		<b><xsl:number/>. </b><h3><xsl:value-of select="@title"/></h3>
		<div style='width:95%;'>  
		<xsl:for-each select="child::*">
			<xsl:if test="name(.)='producer'"><b>producer: </b><xsl:value-of select="." /><br/></xsl:if>
			<xsl:if test="name(.)='roles'"><b>roles: </b><xsl:value-of select="." /><br/></xsl:if>
			<xsl:if test="name(.)='genre'"><b>genre: </b><xsl:value-of select="." /><br/></xsl:if>
			<xsl:if test="name(.)='location'"><b>location: </b><xsl:value-of select="." /><br/></xsl:if>
		</xsl:for-each>

		<table border="1">
		<tr>
		<xsl:for-each select="child::*">
			<div style='width:100%; 
				 	background:#0000bb;
					color:#cccccc;
					padding:4px;'>  
			<xsl:if test="name(.)='description'"><xsl:value-of select="." /></xsl:if>
			</div>
		</xsl:for-each>
		</tr>
		</table>
		</div>
		<br/>
	</xsl:if>
</xsl:for-each>

</body>
</html>

</xsl:template>
</xsl:stylesheet>

